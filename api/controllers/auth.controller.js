import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'

export const signin = async (req, res, next) => {
    const { email, username, image } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.cookie('access_token', token).status(200).json(user);
        }
        else {
            const newUser = await new User({
                email: email,
                username: username.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                avatar: image
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            res.cookie('access_token', token).status(200).json(newUser);
        }
    } catch (error) {
        next(error);
    }
}

export const addemail = async (req, res, next) => {
    try {
        const { email } = req.body.email;
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out.');
    } catch (error) {
        next(error);
    }
}