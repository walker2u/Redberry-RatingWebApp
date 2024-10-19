import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import testRouter from './routes/test.route.js';
import authRouter from './routes/auth.router.js';
import userRouter from './routes/user.route.js';
import imageRouter from './routes/image.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/test', testRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.listen(3000, () => console.log("Server started on port 3000"));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server me lafda ho gya!';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})