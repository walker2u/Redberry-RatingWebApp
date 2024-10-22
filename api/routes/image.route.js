import express from 'express'
import { uploadImage, getImages, deleteImage, randomImage, rating } from '../controllers/image.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/upload', verifyToken, uploadImage);
router.get('/getimages', verifyToken, getImages);
router.post('/delete', deleteImage);
router.get('/random', verifyToken, randomImage);
router.post('/rating', verifyToken, rating);

export default router;