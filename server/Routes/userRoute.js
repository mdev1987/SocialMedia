import express from 'express';
import { deleteUser, followUser, getUser, unfollowUser, updateUser } from '../Controllers/userController.js';

const router = express.Router();

router.get('/:id', getUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.put('/followUser/:id', followUser);
router.put('/unfollowUser/:id', unfollowUser);

export default router;