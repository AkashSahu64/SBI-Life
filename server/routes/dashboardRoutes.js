import express from 'express';
import {
  getDashboardOverview,
  getDashboardRecommendations,
  getDashboardNotifications
} from '../controllers/dashboardController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/', protect, getDashboardOverview);
router.get('/recommendations', protect, getDashboardRecommendations);
router.get('/notifications', protect, getDashboardNotifications);

export default router;