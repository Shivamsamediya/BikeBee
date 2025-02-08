/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CaptainSignup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  //const [captainData, setCaptainData] = useState({});

  const navigate = useNavigate();

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCaptainData = {
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType
      }
    }; 

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,newCaptainData);

    if(response.status ===  201){
      const data = response.data;

      setCaptain(data.captain);

      localStorage.setItem('token',data.token);

      navigate('/captain-home');
    }

    // console.log(newCaptainData);
    // setCaptainData(newCaptainData);
    setFirstName(''); setLastName(''); setEmail(''); setPassword('');
    setColor(''); setPlate(''); setCapacity(''); setVehicleType('');
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-between">
        <div className="flex justify-center items-center py-4">
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-online-cab-booking-icon-download-in-svg-png-gif-file-formats--apps-application-driver-public-transportation-pack-vehicle-icons-1380415.png?f=webp&w=256"
            alt="BikeBee Logo"
            className="h-16 rounded-full"
          />
        </div>
        <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold text-center text-black">Signup to BikeBee</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600" htmlFor="firstname">
                First Name
              </label>
              <input
                className="w-full bg-[#eeeeee] p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-black"
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="w-full bg-[#eeeeee] p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-black"
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                className="w-full bg-[#eeeeee] p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-black"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600" htmlFor="password">
                Password
              </label>
              <input
                className="w-full bg-[#eeeeee] p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-black"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <h3 className="text-lg font-semibold mt-6">Vehicle Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} className="p-2 border rounded" required />
              <input type="text" placeholder="Plate" value={plate} onChange={(e) => setPlate(e.target.value)} className="p-2 border rounded" required />
              <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="p-2 border rounded" required />
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="p-2 border rounded" required>
                <option value="">Select Vehicle</option>
                <option value="MotorCycle">MotorCycle</option>
                <option value="Car">Car</option>
                <option value="Auto">Auto</option>
              </select>
            </div>
            <button className="w-full p-2 mt-6 text-white font-bold bg-black rounded hover:bg-gray-800" type="submit">
              Create New Account
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/captain-login" className="text-black hover:underline">
              Login
            </a>
          </p>
        </div>
        <div className="w-full fixed bottom-0 bg-white py-4 shadow-md flex justify-center items-center">
          <a href="/signup" className="w-3/4 md:w-1/4 p-2 flex justify-center items-center text-white font-bold bg-orange-500 rounded hover:bg-green-800">
            Sign Up as a User
          </a>
        </div>
      </div>
    </>
  );
}

export default CaptainSignup;
