import express from 'express';
import {
  getPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy,
  comparePolicies
} from '../controllers/policyController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/', protect, getPolicies);
router.post('/compare', protect, comparePolicies);

// Admin routes
router.post('/', protect, authorize('admin'), createPolicy);
router.put('/:id', protect, authorize('admin'), updatePolicy);
router.delete('/:id', protect, authorize('admin'), deletePolicy);

export default router;