import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
    //token nikalo
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    // age token nhi mila to..
    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    // kya token blacklisted hai?
    const isBlacklisted = await User.findOne({ token : token});

    // agr ha to..
    if (isBlacklisted) {
        return res.status(404).json({ message: "User not found" });
    }


    try {
        //jwt verification of token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // user ko find kro database me
        const user = await User.findById(decoded._id);

        // agr user na mile
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //req object me user ko save kro
        req.user = user;

        // next middleware ko call
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized user" });
    }
};
