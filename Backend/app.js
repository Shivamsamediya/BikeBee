//dot env ko import aur config kiya
import dotenv from "dotenv";
dotenv.config();

//cors, express ko import kiya
import cors from "cors";

import express from "express";
const app = express();

//cookie parser ko import kia
import cookieParser from 'cookie-parser';

import connectDB from "./db/db.js"; // export default connectDB;

//routes ko import kiya
import userRoute from "./routes/user.routes.js";
import captainRoute from './routes/captain.routes.js';

import mapsRoute from './routes/maps.routes.js';
import rideRoutes from './routes/ride.routes.js';

connectDB();// fn call kiya

// cors = cross origin resource sharing allow kiya.
app.use(cors());
app.use(express.json()); //json format me Apis allow kiya.
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());// cookies ka use krne ke liye

// '/ route k liye get request
app.get('/',(req,res)=>{
    res.send("<h1>Hello World!</h1>");
});

// router for different endpoints.
app.use('/users',userRoute);
app.use('/captains',captainRoute);
app.use('/maps',mapsRoute);
app.use('/rides',rideRoutes);


export default app;


