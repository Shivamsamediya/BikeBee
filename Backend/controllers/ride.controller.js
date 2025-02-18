import { validationResult } from "express-validator";
import { createNewRide } from "../services/ride.service.js";

export const createRide = async (req, res) => {
   // check kro if any err?
   const errors = validationResult(req);

   // if err then return err status
   if(!errors.isEmpty()){
       return res.status(400).json({ errors:errors.array() });
   }

  try {
    // sbhi detail nikalo
    const { pickup, destination, vehicleType } = req.body;

    // new captain create kro
    const ride = await createNewRide(req.user._id, pickup, destination, vehicleType);

    //response
    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
