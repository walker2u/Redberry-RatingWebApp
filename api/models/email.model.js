import mongoose from 'mongoose';

const Email = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

const email = mongoose.model('Email', Email);
export default email;