import express from 'express';
import {
  createReport,
  downloadReport,
  upload
} from '../controllers/reportController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/generate', protect, createReport);
router.get('/download/:fileId', protect, downloadReport);

export default router;