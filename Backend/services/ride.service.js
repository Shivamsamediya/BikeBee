import RideModel from "../models/ride.model.js";
import { getDistanceAndTime } from "../services/maps.service.js"; 
import crypto from 'crypto';

// otp generate krne ka fn.
export const getOTP = (num) => {
  function generateOTP(num){
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
  }
  return generateOTP(num);
};

// fare nikalne ka fn
export const getFare = async (pickup, destination) => {
  try {
    //check for pickup and destination
    if (!pickup || !destination) throw new Error("Pickup and destination are required.");

    // distanc aur time nikalo
    const { distance, duration } = await getDistanceAndTime(pickup, destination);

    //console.log(distance,duration);

    //Extract only numbers from the response (handle units like "kms" or "hours")
    const dist = parseFloat(distance.toString().replace(/[^\d.]/g, ""));
    const time = (parseFloat(duration.toString().replace(/[^\d.]/g, "")) * 60); 

    //console.log(dist,time);

    //check
    if (isNaN(dist) || isNaN(time)) {
      throw new Error("Invalid numeric values for distance or duration.");
    }

    // objects
    const baseFare = { auto: 30, car: 50, moto: 20 };
    const perKmRate = { auto: 10, car: 15, moto: 8 };
    const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

    // response for all vehicle types.
    return {
      auto: baseFare.auto + dist * perKmRate.auto + time * perMinuteRate.auto,
      car: baseFare.car + dist * perKmRate.car + time * perMinuteRate.car,
      moto: baseFare.moto + dist * perKmRate.moto + time * perMinuteRate.moto,
    };
  } catch (error) {
    throw new Error("Error calculating fare: " + error.message);
  }
};

export const createNewRide = async (userId, pickup, destination, vehicleType) => {
  try {
    //check
    if (!userId || !pickup || !destination || !vehicleType) {
      throw new Error("All fields are required.");
    }

    //fare nikalo
    const fare = await getFare(pickup, destination);

    // console.log("Fare Calculation:", fare);

    // new ride ko create kro
    const newRide = new RideModel({
      user: userId,
      pickup,
      destination,
      otp:getOTP(6),
      fare: fare[vehicleType],
    });

    //save kro
    await newRide.save();

    //return kro
    return newRide;
  } catch (error) {
    throw new Error("Error creating ride: " + error.message);
  }
};
