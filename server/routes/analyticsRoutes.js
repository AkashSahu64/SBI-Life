import express from 'express';
import {
  predictPurchaseLikelihood,
  getBehaviorTrends,
  segmentUsers
} from '../controllers/analyticsController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/predict', protect, predictPurchaseLikelihood);

// Admin/Agent routes
router.get('/trends', protect, authorize('admin', 'agent'), getBehaviorTrends);
router.post('/segment', protect, authorize('admin', 'agent'), segmentUsers);

export default router;