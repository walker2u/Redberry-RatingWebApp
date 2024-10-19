import express from "express";
import { test } from '../controllers/test.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.get('/', test);

export default router;