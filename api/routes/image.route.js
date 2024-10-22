import express from 'express'
import { uploadImage, getImages, deleteImage, randomImage, rating, addComment, getComments } from '../controllers/image.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/upload', verifyToken, uploadImage);
router.get('/getimages', verifyToken, getImages);
router.post('/delete', deleteImage);
router.get('/random', verifyToken, randomImage);
router.post('/rating', verifyToken, rating);
router.post('/comment', verifyToken, addComment);
router.get('/getComments', verifyToken, getComments);

export default router;