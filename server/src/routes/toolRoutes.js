import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/upload.js';
import { compressImage, jpgToPdf, pdfToJpg, removeBackground } from '../controllers/toolController.js';

const router = express.Router();
router.use(protect);
router.post('/jpg-to-pdf', upload.array('images', 20), jpgToPdf);
router.post('/pdf-to-jpg', upload.single('pdf'), pdfToJpg);
router.post('/compress-image', upload.single('image'), compressImage);
router.post('/remove-bg', upload.single('image'), removeBackground);
export default router;
