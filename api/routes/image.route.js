import express from 'express'
import { uploadImage } from '../controllers/image.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/upload', verifyToken, uploadImage);

export default router;