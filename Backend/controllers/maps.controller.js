import { validationResult } from "express-validator";
import { getAddressCoordinates, getDistanceAndTime, getAutocompleteSuggestions  } from "../services/maps.service.js";


export const getCoordinates = async (req, res) => {
    // check kro if any err?
    const errors = validationResult(req);

    // if err then return err status
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

  try {
    //req body se address nikalo
    const { address } = req.body;

    //check if address is there or not.
    if (!address) return res.status(400).json({ message: "Address is required." });

    //coordinates nikalo.
    const coordinates = await getAddressCoordinates(address);

    //response
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDistanceTime = async (req, res) => {
    // check kro if any err?
    const errors = validationResult(req);

    // if err then return err status
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

  try {
    // origin aur destination nikalo
    const { origin, destination } = req.body;

    //check if present
    if (!origin || !destination) {
      return res.status(400).json({ message: "Both origin and destination are required." });
    }

    //getDistanceAndTime function ko call kro with origin and destination
    const distanceAndTime = await getDistanceAndTime(origin, destination);

    //response bhejo
    res.json(distanceAndTime);

    // console.log(distanceAndTime.distance);
    // console.log(distanceAndTime.duration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAutocomplete = async (req, res) => {
   // check kro if any err?
   const errors = validationResult(req);

   // if err then return err status
   if(!errors.isEmpty()){
       return res.status(400).json({ errors:errors.array() });
   }

  try {
    // input nikalo
    const { input } = req.body; 

    //check if present
    if (!input) {
      return res.status(400).json({ message: "Input is required." });
    }
    
    //generate suggestions
    const suggestions = await getAutocompleteSuggestions(input);

    //send response
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

