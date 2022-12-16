import express from 'express';
import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import postRoute from './postRoute.js';
import chatRoute from './chatRoute.js';
import messageRoute from './messageRoute.js';
import errorHandler from '../Controllers/errorController.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/chat', chatRoute);
router.use('/message', messageRoute);
router.use(errorHandler);

export default router;