import express from 'express';
import { createPost, deletePost, getPost, getUserPosts, likePost, updatePost } from '../Controllers/postController.js';
const router = express.Router();
import multer from 'multer';
import { authUser } from '../Controllers/authController.js';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({ storage: storage })

router.use(authUser);
router.post('/', upload.single('file'), createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', likePost);
router.get('/:id/posts', getUserPosts);

export default router;