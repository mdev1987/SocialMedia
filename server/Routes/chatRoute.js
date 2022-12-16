import express from 'express';
import { authUser } from '../Controllers/authController.js';
import { createChat, findChat, userChats } from '../Controllers/chatController.js';

const router = express.Router();
router.use(authUser);
router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);

export default router;