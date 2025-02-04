import User from "../models/user.model.js";

export const createUser = ({ firstName,lastName,email,password }) => {

    //check kro these three are there or not?
    if(!firstName || !email || !password){
        throw new Error("All fields are required!");
    }

    //create user
    const user = User.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    })

    return user;
}

