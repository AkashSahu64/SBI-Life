import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  deleteUser
} from '../controllers/userController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router;