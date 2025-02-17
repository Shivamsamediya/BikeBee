import express from "express";

import { getCoordinates, getDistanceTime, getAutocomplete } from "../controllers/maps.controller.js";

import { authUser } from '../middlewares/auth.middleware.js';

import { body } from "express-validator";

const router = express.Router();

router.post("/get-coordinates",
  body('address').isString().isLength({ min:3 }),
  authUser, getCoordinates);

router.post("/get-distance-time",
  body('origin').isString().isLength({ min:3 }),
  body('destination').isString().isLength({ min:3 }),
  authUser, getDistanceTime);

router.get("/get-suggestions",
  body('input').isString().isLength({ min:3 }),
  authUser, getAutocomplete);
  
export default router;
