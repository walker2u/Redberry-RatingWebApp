import bcrypt from 'bcryptjs'

export const signin = async (req, res, next) => {
    try {
        const { email } = req.body.email;
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