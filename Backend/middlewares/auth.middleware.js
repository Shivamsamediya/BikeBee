import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    const isBlacklisted = await User.findOne({ token : token});

    if (isBlacklisted) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized user" });
    }
};
