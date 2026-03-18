import express from 'express';
import { chatWithAI, getAIConversations } from '../controllers/aiController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/chat', protect, chatWithAI);
router.get('/conversations', protect, getAIConversations);

export default router;
