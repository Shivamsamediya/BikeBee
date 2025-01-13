import bodyParser from "body-parser";

import User from "../models/user.model.js"; // export default User;

import { createUser } from "../services/user.service.js";// export const createUser

import { cookie, validationResult } from "express-validator";

import blackListToken from '../models/blacklistToken.model.js';

export const registerUser = async (req,res,next)=>{
    // check kro if any err?
    const errors = validationResult(req);

    // if err then return err status
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    // req.body se name ,email,password nikalo
    const { fullName, email, password } = req.body;

    //password ko hash kro 
    const hashedPassword = await User.hashPassword(password);

    // new user create kro... yr yha await lagana bhul gya tha.. dumb me!!
    const user = await createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashedPassword
    })

    // token generate kro
    const token = await user.generateAuthToken();

    // console.log(user);
    // console.log(token);

    // token aur user ko return kro with success status.
    res.status(201).json({ token, user });
}

export const loginUser = async(req,res,next)=>{
    // check kro if any err?
    const errors = validationResult(req);

    // if err then return err status
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    // email, password nikalo body se
    const { email, password } = req.body;

    // check kro kya user exist krta hai
    const user = await User.findOne({ email }).select('+password');

    // agr nhi to..
    if(!user){
        return res.status(401).json({message:"Invalid email or password!"});
    }

    // agr ha to..password match kro
    const isMatch = await user.comparePassword(password);


    // agr password match nhi hua to..
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password!"});
    }

    //agr ho gya to...token generate kro.
    const token = await user.generateAuthToken();

    //token ko cookie me set kro
    res.cookie('token',token);

    //response me token aur user bhejo
    res.status(200).json({ token, user });
}

export const userProfile = async(req,res,next)=>{
    return res.status(201).json(req.user);
}

export const logoutUser = async (req,res,next) => {
    //token ko cookie me se clear kro
    res.clearCookie('token');

    const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);

    //token ko blacklist kro
    blackListToken.create({ token });

    res.status(200).json({message:"Logged out"});
}