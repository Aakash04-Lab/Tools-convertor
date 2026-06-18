import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import toolRoutes from './routes/toolRoutes.js';
import fs from 'fs';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = process.env.VERCEL ? path.join(os.tmpdir(), 'mern-tools-suite') : path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use('/downloads', express.static(tempDir, {
  setHeaders: (res, filePath) => {
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
  }
}));

app.get('/', (_, res) => res.json({ message: 'MERN Tools Suite API running' }));
app.get('/api', (_, res) => res.json({ message: 'MERN Tools Suite API running' }));
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);

const PORT = process.env.PORT || 5000;
let dbConnection;
export const ensureDBConnection = () => {
  if (!dbConnection) dbConnection = connectDB();
  return dbConnection;
};

if (!process.env.VERCEL) {
  ensureDBConnection().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}

export default app;
