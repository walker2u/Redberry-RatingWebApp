import Image from '../models/image.model.js';
import Rating from '../models/rating.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js'
import Comment from '../models/comments.model.js';

export const uploadImage = async (req, res, next) => {
    try {
        const { imageUrl, imageRef } = req.body;
        const image = new Image({ imageUrl, imageRef });
        await image.save();
        res.status(200).json(image);
    } catch (error) {
        next(error);
    }
};

export const getImages = async (req, res, next) => {
    try {
        const images = await Image.find();
        if (images.length === 0) {
            return next(errorHandler(404, "Image not found!"));
        }
        res.status(200).json(images);
    } catch (error) {
        next(error);
    }
}

export const deleteImage = async (req, res, next) => {
    try {
        const { imageRef } = req.body;
        const image = await Image.findOneAndDelete({ imageRef });
        if (!image) {
            return next(errorHandler(404, "Image not found!"));
        }
        res.status(200).json("Deleted successfully");
    } catch (error) {
        next(error);
    }
}

export const randomImage = async (req, res, next) => {
    try {
        const randomImage = await Image.aggregate(
            [{ $sample: { size: 1 } }]
        );
        if (!randomImage) {
            return next(errorHandler(404, "Image not found!"));
        }
        res.status(200).json(randomImage);
    } catch (error) {
        next(error);
    }
}

export const rating = async (req, res, next) => {
    try {
        const { imageRef, rating, userId } = req.body;
        if (rating < 1 || rating > 5) {
            return next(errorHandler(400, "Rating must be between 1 and 5"));
        }
        const existingRating = await Rating.findOne({ imageRef, userId });
        if (existingRating) {
            return next(errorHandler(400, "You have already rated this image!"));
        }
        const newRating = await new Rating({ imageRef, rating, userId });
        await newRating.save();
        res.status(200).json(newRating);
    } catch (error) {
        next(error);
    }
}

export const addComment = async (req, res, next) => {
    try {
        const { imageRef, comment, userId } = req.body;
        const newComment = await new Comment({ comment, userId, imageRef });
        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
}

export const getComments = async (req, res, next) => {
    try {
        const { imageRef } = req.body;
        const comments = await Comment.find({ imageRef });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}