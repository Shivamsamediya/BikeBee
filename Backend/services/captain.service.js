import captainModel from "../models/captain.model.js";

export const createCaptain = ({ firstName,lastName,email,password,color,plate,capacity,vehicleType }) => {

    //checks
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All fields are required!");
    }

    //create captain
    const captain = captainModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}