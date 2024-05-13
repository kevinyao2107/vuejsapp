import express from 'express';
import {
  deleteTodo,
  GetTodo,
  createTodo,
  updateTodo,
} from '../controllers/todoControllers.js';
import { protect } from '../middleWares/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, createTodo).get(GetTodo);

router.route('/:id').delete(protect, deleteTodo).put(protect, updateTodo);

export default router;
