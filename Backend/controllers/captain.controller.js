import bodyParser from 'body-parser';

import captainModel from '../models/captain.model.js';

import { cookie, validationResult } from 'express-validator';

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
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if(!captain){
        return res.status(401).json({message:"Invalid email or password"});
    }
    
    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token = await captain.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({ token, captain });
}