import mongoose from 'mongoose';

const image = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
        unique: true
    },
    imageRef: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Image = mongoose.model('Image', image);
export default Image;