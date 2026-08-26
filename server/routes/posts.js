import express from 'express';
import { deletePost, getFeedPosts, getUserPosts, likePost, updateDescription } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// // READ
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

// // PATCH
router.patch('/:id/like', verifyToken, likePost);
router.patch('/:postId/description', verifyToken, updateDescription);
router.delete('/:postId', verifyToken, deletePost)

export default router;