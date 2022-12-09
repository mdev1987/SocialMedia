import express from 'express';
import { createPost, deletePost, getPost, getUserPosts, likePost, updatePost } from '../Controllers/postController.js';
const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', likePost);
router.get('/:id/posts',getUserPosts);

export default router;