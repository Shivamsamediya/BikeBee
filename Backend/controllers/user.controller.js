import bodyParser from "body-parser";

import User from "../models/user.model.js"; // export default User;

import { createUser } from "../services/user.service.js";// export const createUser

import { validationResult } from "express-validator";

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
    const token = await user.generateAuthToken;

    // console.log(user);
    // console.log(token);

    // token aur user ko return kro with success status.
    res.status(201).json({ token, user });
}