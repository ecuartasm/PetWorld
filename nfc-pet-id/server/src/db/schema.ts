import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.resolve(__dirname, '..', '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new Database(path.join(DATA_DIR, 'pets.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    email         TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS pets (
    id         TEXT    PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name       TEXT    NOT NULL,
    species    TEXT,
    breed      TEXT,
    photo_url  TEXT,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_info (
    pet_id      TEXT PRIMARY KEY REFERENCES pets(id) ON DELETE CASCADE,
    owner_name  TEXT,
    owner_phone TEXT,
    alt_phone   TEXT
  );

  CREATE TABLE IF NOT EXISTS medical_info (
    pet_id      TEXT PRIMARY KEY REFERENCES pets(id) ON DELETE CASCADE,
    allergies   TEXT,
    medications TEXT,
    conditions  TEXT,
    vet_name    TEXT,
    vet_phone   TEXT
  );
`);

export default db;
