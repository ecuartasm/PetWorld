import { Router, Request, Response } from 'express';
import db from '../db/schema';

const router = Router();

router.get('/:petId', (req: Request, res: Response): void => {
  const pet = db.prepare(`
    SELECT
      p.id, p.name, p.species, p.breed, p.photo_url,
      ci.owner_name, ci.owner_phone, ci.alt_phone,
      mi.allergies, mi.medications, mi.conditions, mi.vet_name, mi.vet_phone
    FROM pets p
    LEFT JOIN contact_info ci ON ci.pet_id = p.id
    LEFT JOIN medical_info mi ON mi.pet_id = p.id
    WHERE p.id = ?
  `).get(req.params.petId);

  if (!pet) {
    res.status(404).json({ error: 'Pet not found' });
    return;
  }
  res.json(pet);
});

export default router;
