import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  logoutUser
} from '../controllers/userController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

// Protected routes
router.post('/register', registerUser)
router.post('/login', loginUser);
router.get('/logout',logoutUser);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router;