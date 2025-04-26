import express from 'express';
import {
  sendEmailNotification,
  sendWhatsAppNotification
} from '../controllers/notificationController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes for agents and admins
router.post('/email', protect, authorize('agent', 'admin'), sendEmailNotification);
router.post('/whatsapp', protect, authorize('agent', 'admin'), sendWhatsAppNotification);

export default router;