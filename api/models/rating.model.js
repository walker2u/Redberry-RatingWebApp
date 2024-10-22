import mongoose from 'mongoose';

const rating = new mongoose.Schema({
    imageRef: {
        type: String,
        required: true,
        ref: 'Image'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Rating = mongoose.model('Rating', rating);
export default Rating;