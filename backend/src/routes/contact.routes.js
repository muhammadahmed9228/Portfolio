import { Router } from 'express';
import {
  createContactMessage,
  getAllMessages,
  toggleReadStatus,
  deleteMessage
} from '../controllers/contact.controller.js';
import { verifyAdmin } from '../middlewares/admin.middleware.js';

const router = Router();

// Public route (Visitor / Recruiter submits form)
router.post('/', createContactMessage);

// Protected Admin routes (Manage inbox)
router.get('/', verifyAdmin, getAllMessages);
router.patch('/:id/read', verifyAdmin, toggleReadStatus);
router.delete('/:id', verifyAdmin, deleteMessage);

export default router;