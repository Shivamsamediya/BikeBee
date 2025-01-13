// req modules ko import kro
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// mongoose schema banao
const userSchema =  mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,"FirstName length must be greater than 3"]
        },
        lastName:{
            type:String,
            minLength:[3,"LastName length must be greater than 3"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[3,"Email length must be greater than 3"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        minLength:[6,"Password length must be greater than 6"]
    },
    socketId:{
        type:String
    }
})

// JWT token generate krne ka method.
userSchema.methods.generateAuthToken = function () {
    const token =  jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
};

// passwords compare krne ka method
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// passwords hash krne ka method
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

export default User;