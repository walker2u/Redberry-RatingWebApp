import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/redberry-rating-app.appspot.com/o/IMG20220123160204.jpg?alt=media&token=948f3134-6a45-4a76-897a-1a49203b8880'
    }
}, { timestamps: true });

const user = mongoose.model('User', User);
export default user;