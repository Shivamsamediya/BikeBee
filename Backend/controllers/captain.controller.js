import bodyParser from 'body-parser';

import captainModel from '../models/captain.model.js';

import { cookie, validationResult } from 'express-validator';

import blacklistToken from '../models/blacklistToken.model.js'

import { createCaptain } from '../services/captain.service.js';

export const registerCaptain = async (req,res,next)=>{
    // check kro if any err?
    const errors = validationResult(req);

    // if err then return err status
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    // req.body se name ,email,password nikalo
    const { fullName, email, password, vehicle } = req.body;

    const isCaptainExists =  await captainModel.findOne({email});

    if(isCaptainExists){
        return res.status(400).json({message:"Captain with this email already exists"});
    }

    //password ko hash kro 
    const hashedPassword = await captainModel.hashPassword(password);

    // new user create kro... yr yha await lagana bhul gya tha.. dumb me!!
    const captain = await createCaptain({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })

    // token generate kro
    const token = await captain.generateAuthToken();

    // console.log(captain);
    // console.log(token);

    // token aur user ko return kro with success status.
    res.status(201).json({ token, captain });
}

export const loginCaptain = async(req,res,next)=>{
    //check if any err?
    const errors = validationResult(req);

    //if err then return err status
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    // req.body se email, password nikalo
    const { email, password } = req.body;

    //check if captain with email and password exists?
    const captain = await captainModel.findOne({ email }).select('+password');

    //if not return msg
    if(!captain){
        return res.status(401).json({message:"Invalid email or password"});
    }
    
    //compare the password
    const isMatch = await captain.comparePassword(password);

    //if password not matched
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    //generate the token
    const token = await captain.generateAuthToken();

    //save token in cookie
    res.cookie('token',token);

    //return token and captain
    res.status(200).json({ token, captain });
}

export const captainProfile = async (req,res,next)=>{
    return res.status(201).json(req.captain); 
}

export const logoutCaptain = async(req,res,next)=>{
    //token ko cookie me se clear kro
    res.clearCookie('token');

    const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);

    //token ko blacklist kro
    blacklistToken.create({ token });

    res.status(200).json({message:"Logged out"});
}