import Image from '../models/image.model.js';

export const uploadImage = async (req, res) => {
    try {
        const { imageUrl, imageRef } = req.body;
        const image = new Image({ imageUrl, imageRef });
        await image.save();
        res.status(200).json(image);
    } catch (error) {
        next(error);
    }
}