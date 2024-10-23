import express from "express";
import { signin, addemail, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signin', signin);
router.post('/addemail', addemail);
router.get('/logout', logout);

export default router;