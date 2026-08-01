import { Router } from 'express';
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experience.controller.js';
import { verifyAdmin } from '../middlewares/admin.middleware.js';

const router = Router();

// Public routes
router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

// Protected Admin routes
router.post('/', verifyAdmin, createExperience);
router.put('/:id', verifyAdmin, updateExperience);
router.delete('/:id', verifyAdmin, deleteExperience);

export default router;