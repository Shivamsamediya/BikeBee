import express from 'express';
import { body } from 'express-validator';
import { captainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captain.controller.js';

import { authCaptain } from '../middlewares/authcaptain.middleware.js';
const router = express.Router();

router.post('/register',[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({min:3}).withMessage("FirstName must be atleast 3 characters long"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color must be atleast 3 characters long"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate must be atleast 3 characters long"),
    body("vehicle.capacity").isInt({min:1}).withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType").isIn(['MotorCycle','Car','Auto']).withMessage("Vehicle must be among these 3")
],
    registerCaptain
)

router.post('/login',[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],
    loginCaptain
)

router.get('/profile',authCaptain,captainProfile);
router.get('/logout',authCaptain,logoutCaptain);

export default router;