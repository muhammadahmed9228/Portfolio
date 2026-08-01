import { Router } from 'express';
import { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/project.controller.js';
import { verifyAdmin } from '../middlewares/admin.middleware.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected Admin routes
router.post('/', verifyAdmin, upload.single('image'), createProject);
router.put('/:id', verifyAdmin, upload.single('image'), updateProject);
router.delete('/:id', verifyAdmin, deleteProject);

export default router;