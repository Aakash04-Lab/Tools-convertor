import express from 'express';
import { forgotPassword, login, me, resetPassword, signup } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, me);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
export default router;
