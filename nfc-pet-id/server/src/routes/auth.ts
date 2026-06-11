import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/schema';
import { JWT_SECRET, requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

router.post('/signup', (req: Request, res: Response): void => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email?.trim() || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters' });
    return;
  }
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.trim().toLowerCase());
  if (existing) {
    res.status(409).json({ error: 'An account with that email already exists' });
    return;
  }
  const hash = bcrypt.hashSync(password, 10);
  const result = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(
    email.trim().toLowerCase(),
    hash
  );
  const token = jwt.sign({ userId: result.lastInsertRowid }, JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, COOKIE_OPTS);
  res.status(201).json({ id: result.lastInsertRowid, email: email.trim().toLowerCase() });
});

router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email?.trim() || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }
  const user = db.prepare('SELECT id, email, password_hash FROM users WHERE email = ?').get(
    email.trim().toLowerCase()
  ) as { id: number; email: string; password_hash: string } | undefined;

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, COOKIE_OPTS);
  res.json({ id: user.id, email: user.email });
});

router.post('/logout', (_req: Request, res: Response): void => {
  res.clearCookie('token');
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req: AuthRequest, res: Response): void => {
  const user = db.prepare('SELECT id, email FROM users WHERE id = ?').get(req.userId) as
    | { id: number; email: string }
    | undefined;
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
});

export default router;
