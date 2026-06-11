import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { nanoid } from 'nanoid';
import authRouter from './routes/auth';
import petsRouter from './routes/pets';
import publicRouter from './routes/public';
import { requireAuth } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 3001;

const UPLOADS_DIR = path.resolve(__dirname, '..', 'data', 'uploads');

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }));
app.use(cookieParser());

// Upload endpoint — registered before express.json() so express.raw() applies
app.post(
  '/api/upload',
  requireAuth,
  express.raw({ type: 'image/*', limit: '8mb' }),
  (req, res): void => {
    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
      res.status(400).json({ error: 'No image data received' });
      return;
    }
    const mime = (req.headers['content-type'] ?? '').split(';')[0];
    const extMap: Record<string, string> = {
      'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png',
      'image/gif': 'gif', 'image/webp': 'webp',
    };
    const ext = extMap[mime];
    if (!ext) {
      res.status(400).json({ error: 'Unsupported image type (jpeg, png, gif, webp)' });
      return;
    }
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    const filename = `${nanoid(12)}.${ext}`;
    fs.writeFileSync(path.join(UPLOADS_DIR, filename), req.body);
    res.json({ url: `/uploads/${filename}` });
  }
);

app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

app.use('/api/auth', authRouter);
app.use('/api/pets', petsRouter);
app.use('/api/public', publicRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
