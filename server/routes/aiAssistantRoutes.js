import express from 'express';
import {
  getAiAssistantResponse,
  getAiRecommendations,
  saveAiFeedback
} from '../controllers/aiAssistantController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { aiResponseBiasCheck } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/assistant', protect, aiResponseBiasCheck, getAiAssistantResponse);
router.post('/recommend', protect, getAiRecommendations);
router.post('/feedback', protect, saveAiFeedback);

export default router;