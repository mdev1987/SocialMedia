import express from 'express';
import { authUser } from '../Controllers/authController.js';
import { addMessage, getMessages } from '../Controllers/messageController.js';

const router = express.Router();
router.use(authUser)
router.post('/', addMessage);
router.get('/:chatId', getMessages);

export default router;