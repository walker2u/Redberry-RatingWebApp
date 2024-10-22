import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import testRouter from './routes/test.route.js';
import authRouter from './routes/auth.router.js';
import userRouter from './routes/user.route.js';
import imageRouter from './routes/image.route.js';
import Image from "./models/image.model.js";
import { errorHandler } from "./utils/error.js";
import cron from 'node-cron';
import fire from './firebase.js';
import { getStorage, ref, deleteObject } from "firebase/storage";

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

//cron job for random image ------------------------------------------------------------------

let currentImage = {
    imageUrl: "",
    imageRef: ""
};

cron.schedule('0 4 * * *', async () => {
    console.log("Running image update at:", new Date());
    await updateCurrentImage();
});

const deleteCurrentImage = async () => {
    try {
        const delRef = currentImage.imageRef;
        if (!delRef) {
            console.log("No current image to delete.");
            return;
        }
        //delete from mongo
        const res = await fetch('http://localhost:3000/api/image/delete', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                imageRef: delRef
            })
        });
        const data = await res.json();
        if (data.success === false) {
            console.log("Error deleting image from MongoDB:", data.message);
            return;
        }
        //delete from firebase
        const storage = await getStorage(fire);
        const desertRef = ref(storage, delRef);
        await deleteObject(desertRef);
        currentImage.imageRef = '';
        currentImage.imageUrl = '';
    } catch (error) {
        console.log(error);
    }
};

const updateCurrentImage = async () => {
    try {
        await deleteCurrentImage();
        const randomImage = await Image.aggregate(
            [{ $sample: { size: 1 } }]
        );
        if (randomImage.length === 0) {
            console.log("No images found in the database.");
            return;
        }
        currentImage = {
            imageUrl: randomImage[0].imageUrl,
            imageRef: randomImage[0].imageRef
        };
        console.log("New current image:", currentImage);
    } catch (error) {
        console.log(error);
    }
}

updateCurrentImage();

app.get('/api/todaysImage', (req, res) => {
    try {
        if (currentImage) {
            res.status(200).json(currentImage);
        } else {
            updateCurrentImage();
            res.status(200).json(currentImage);
        }
    } catch (error) {
        console.error("Error serving today's image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})