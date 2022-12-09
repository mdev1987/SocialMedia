import express from 'express';
import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import postRoute from './postRoute.js';
import errorHandler from '../Controllers/errorController.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/post',postRoute);
router.use(errorHandler);

export default router;