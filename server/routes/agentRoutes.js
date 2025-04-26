import express from 'express';
import {
  getCustomers,
  getCustomerInsights,
  simulateUpsellScenario
} from '../controllers/agentController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Agent routes
router.get('/customers', protect, authorize('agent', 'admin'), getCustomers);
router.get('/insights/:userId', protect, authorize('agent', 'admin'), getCustomerInsights);
router.post('/simulate', protect, authorize('agent', 'admin'), simulateUpsellScenario);

export default router;