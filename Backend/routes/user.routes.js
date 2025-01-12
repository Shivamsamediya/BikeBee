import express from "express";
import { body } from "express-validator";
import { registerUser }  from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register',[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({min:3}).withMessage("FirstName length must be greater than 3"),
    body("password").isLength({min:6}).withMessage("Password length must be greater than 6")
],
    registerUser
)

export default router;