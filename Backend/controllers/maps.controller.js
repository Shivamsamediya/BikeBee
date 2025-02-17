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
    const { address } = req.body;
    if (!address) return res.status(400).json({ message: "Address is required." });

    const coordinates = await getAddressCoordinates(address);
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
    const { origin, destination } = req.body;
    if (!origin || !destination) {
      return res.status(400).json({ message: "Both origin and destination are required." });
    }

    // Call the getDistanceAndTime function with the coordinates
    const distanceAndTime = await getDistanceAndTime(origin, destination);
    res.json(distanceAndTime);

    console.log(distanceAndTime.distance);
    console.log(distanceAndTime.duration);
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
    const { input } = req.body; 
    if (!input) {
      return res.status(400).json({ message: "Input is required." });
    }

    const suggestions = await getAutocompleteSuggestions(input);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

