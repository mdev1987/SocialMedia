import express from 'express';
import authRoute from './authRoute.js';
import errorHandler from '../Controllers/errorController.js';

const router = express.Router();

router.use('/auth', authRoute)
router.use(errorHandler);

export default router;