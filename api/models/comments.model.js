import mongoose from "mongoose";

const comment = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageRef: {
        type: String,
        ref: 'Image',
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', comment);
export default Comment;