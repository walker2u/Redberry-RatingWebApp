import express from "express";
import { signin, addemail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signin', signin);
router.post('/addemail', addemail);

export default router;