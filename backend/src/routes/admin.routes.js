import { Router } from 'express';
import { 
  registerUser, 
  loginUser, 
  logOutUser, 
  refreshAccessToken 
} from '../controllers/admin.controller.js'; // Adjust path if your controller file has a different name
import { verifyAdmin } from '../middlewares/admin.middleware.js';

const router = Router();

// Public Auth Routes
// router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);

// Protected Auth Routes
router.post('/logout', verifyAdmin, logOutUser);

export default router;