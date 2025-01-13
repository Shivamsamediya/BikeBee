import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const captainSchema = mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,"FirstName must be atleast 3 characters long"]
        },
        lastName:{
            type:String,
            minLength:[3,"LastName must be atleast 3 characters long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[3,"email must be atleast 3 characters long"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        minLength:[6,"password must be atleast 6 characters long"]
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,"color must be atleast 3 characters long"]
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,"Plate must be atleast 3 characters long"]
        },
        capacity:{
            type:Number,
            required:true,
            minLength:[1,"Capacity must be atleast 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['motorcycle','car','auto']
        }
    },
    location:{
        lat:{
            type:Number
        },
        lon:{
            type:Number
        }
    }
})

// JWT token generate krne ka method.
captainSchema.methods.generateAuthToken = function () {
    const token =  jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
};

// passwords compare krne ka method
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// passwords hash krne ka method
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


const captainModel = mongoose.model("Captain",captainSchema);

export default captainModel;