import express from 'express';
import {
  register,
  auth,
  getUsersById,
  UserProfile,
  updateUsers,
} from '../controllers/userControllers.js';
import { protect } from '../middleWares/authMiddleware.js';
const router = express.Router();

router.route('/login').post(auth);
router.route('/').post(register).put(protect, updateUsers);

router.route('/profile').get(protect, UserProfile);

router.route('/:id').get(protect, getUsersById);

export default router;
