import { Router, Response } from 'express';
import { nanoid } from 'nanoid';
import db from '../db/schema';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const FULL_PET_QUERY = `
  SELECT p.*,
    ci.owner_name, ci.owner_phone, ci.alt_phone,
    mi.allergies, mi.medications, mi.conditions, mi.vet_name, mi.vet_phone
  FROM pets p
  LEFT JOIN contact_info ci ON ci.pet_id = p.id
  LEFT JOIN medical_info mi ON mi.pet_id = p.id
`;

router.get('/', requireAuth, (req: AuthRequest, res: Response): void => {
  const pets = db.prepare(`${FULL_PET_QUERY} WHERE p.user_id = ? ORDER BY p.created_at DESC`).all(req.userId);
  res.json(pets);
});

router.get('/:id', requireAuth, (req: AuthRequest, res: Response): void => {
  const pet = db.prepare(`${FULL_PET_QUERY} WHERE p.id = ? AND p.user_id = ?`).get(req.params.id, req.userId);
  if (!pet) {
    res.status(404).json({ error: 'Pet not found' });
    return;
  }
  res.json(pet);
});

router.post('/', requireAuth, (req: AuthRequest, res: Response): void => {
  const { name } = req.body as { name?: string };
  if (!name?.trim()) {
    res.status(400).json({ error: 'Pet name is required' });
    return;
  }
  const id = nanoid(10);
  db.prepare('INSERT INTO pets (id, user_id, name) VALUES (?, ?, ?)').run(id, req.userId, name.trim());
  db.prepare('INSERT INTO contact_info (pet_id) VALUES (?)').run(id);
  db.prepare('INSERT INTO medical_info (pet_id) VALUES (?)').run(id);
  const pet = db.prepare(`${FULL_PET_QUERY} WHERE p.id = ?`).get(id);
  res.status(201).json(pet);
});

router.put('/:id', requireAuth, (req: AuthRequest, res: Response): void => {
  const existing = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?').get(req.params.id, req.userId);
  if (!existing) {
    res.status(404).json({ error: 'Pet not found' });
    return;
  }
  const {
    name, species, breed, photo_url,
    owner_name, owner_phone, alt_phone,
    allergies, medications, conditions, vet_name, vet_phone,
  } = req.body as Record<string, string | undefined>;

  if (name !== undefined) {
    if (!name.trim()) {
      res.status(400).json({ error: 'Pet name cannot be empty' });
      return;
    }
    db.prepare('UPDATE pets SET name = ?, species = ?, breed = ?, photo_url = ? WHERE id = ?').run(
      name.trim(), species ?? null, breed ?? null, photo_url ?? null, req.params.id
    );
  }

  db.prepare(`
    INSERT INTO contact_info (pet_id, owner_name, owner_phone, alt_phone) VALUES (?, ?, ?, ?)
    ON CONFLICT(pet_id) DO UPDATE SET
      owner_name  = excluded.owner_name,
      owner_phone = excluded.owner_phone,
      alt_phone   = excluded.alt_phone
  `).run(req.params.id, owner_name ?? null, owner_phone ?? null, alt_phone ?? null);

  db.prepare(`
    INSERT INTO medical_info (pet_id, allergies, medications, conditions, vet_name, vet_phone) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(pet_id) DO UPDATE SET
      allergies   = excluded.allergies,
      medications = excluded.medications,
      conditions  = excluded.conditions,
      vet_name    = excluded.vet_name,
      vet_phone   = excluded.vet_phone
  `).run(req.params.id, allergies ?? null, medications ?? null, conditions ?? null, vet_name ?? null, vet_phone ?? null);

  const updated = db.prepare(`${FULL_PET_QUERY} WHERE p.id = ?`).get(req.params.id);
  res.json(updated);
});

router.delete('/:id', requireAuth, (req: AuthRequest, res: Response): void => {
  const existing = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?').get(req.params.id, req.userId);
  if (!existing) {
    res.status(404).json({ error: 'Pet not found' });
    return;
  }
  db.prepare('DELETE FROM pets WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
