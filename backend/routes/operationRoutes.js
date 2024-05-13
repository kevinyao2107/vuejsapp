import express from 'express';
import { getAllOperationLogs } from '../controllers/operationLogControllers.js';
import { protect } from '../middleWares/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, getAllOperationLogs);

export default router;
