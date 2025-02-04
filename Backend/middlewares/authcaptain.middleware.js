import jwt from 'jsonwebtoken';
import captainModel from '../models/captain.model.js';

export const authCaptain = async (req, res, next) => {
    //token nikalo
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    // age token nhi mila to..
    if (!token) {
        return res.status(401).json({ message: "Unauthorized captain" });
    }

    // kya token blacklisted hai?
    const isBlacklisted = await captainModel.findOne({ token : token});

    // agr ha to..
    if (isBlacklisted) {
        return res.status(404).json({ message: "Captain not found" });
    }


    try {
        //jwt verification of token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // captain ko find kro database me
        const captain = await captainModel.findById(decoded._id);

        // agr captain na mile
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        //req object me captain ko save kro
        req.captain = captain;

        // next middleware ko call
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized captain" });
    }
};
