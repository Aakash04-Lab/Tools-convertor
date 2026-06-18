import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, path.join(__dirname, '../temp')),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});

export const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }
});
