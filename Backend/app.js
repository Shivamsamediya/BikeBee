//dot env ko import aur config kiya
import dotenv from "dotenv";
dotenv.config();

//cors, express ko import kiya
import cors from "cors";

import express from "express";
const app = express();

import cookieParser from 'cookie-parser';

import connectDB from "./db/db.js"; // export default connectDB;
import userRoute from "./routes/user.routes.js"

connectDB();// fn call kiya

// cors = cross origin resource sharing allow kiya.
app.use(cors());
app.use(express.json()); //json format me Apis allow kiya.
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

// '/ route k liye get request
app.get('/',(req,res)=>{
    res.send("<h1>Hello World!</h1>");
});

// router for /users.
app.use('/users',userRoute);

export default app;


