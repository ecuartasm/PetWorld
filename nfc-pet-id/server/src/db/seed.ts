import db from './schema';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

const EMAIL = 'demo@example.com';
const PASSWORD = 'demo1234';

const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(EMAIL);
if (existing) {
  const pet = db.prepare('SELECT id FROM pets WHERE user_id = ?').get((existing as { id: number }).id);
  console.log('Seed already exists. Skipping.');
  if (pet) {
    console.log(`✓ Public URL: http://localhost:5173/p/${(pet as { id: string }).id}`);
  }
  process.exit(0);
}

const hash = bcrypt.hashSync(PASSWORD, 10);
const userResult = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(EMAIL, hash);
const userId = userResult.lastInsertRowid as number;

const petId = nanoid(10);

db.prepare(
  'INSERT INTO pets (id, user_id, name, species, breed, photo_url) VALUES (?, ?, ?, ?, ?, ?)'
).run(
  petId,
  userId,
  'Luna',
  'Dog',
  'Golden Retriever',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop'
);

db.prepare(
  'INSERT INTO contact_info (pet_id, owner_name, owner_phone, alt_phone) VALUES (?, ?, ?, ?)'
).run(petId, 'Alex Johnson', '+1-555-0100', '+1-555-0101');

db.prepare(
  'INSERT INTO medical_info (pet_id, allergies, medications, conditions, vet_name, vet_phone) VALUES (?, ?, ?, ?, ?, ?)'
).run(petId, 'Pollen, Chicken', 'Apoquel 16mg daily', 'Seasonal allergies', 'Dr. Sarah Mills', '+1-555-0200');

console.log(`✓ Demo user: ${EMAIL} / ${PASSWORD}`);
console.log(`✓ Demo pet: Luna (ID: ${petId})`);
console.log(`✓ Public URL: http://localhost:5173/p/${petId}`);
