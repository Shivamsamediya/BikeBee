/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CaptainLogin() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    // const [captainData, setCaptainData] = useState({});

    const { captain,setCaptain } = React.useContext(CaptainDataContext);

    const navigate = useNavigate();
  
    const submitHandler = async (e) =>{
      e.preventDefault();
  
    const newCaptainData = {
      email: email,
      password: password,
    };

    //console.log(newCaptainData);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,newCaptainData);

    if(response.status ===  200){
      const data = response.data;

      setCaptain(data.user);

      localStorage.setItem('token',data.token);

      navigate('/captain-home');
    }
      
      // console.log(newCaptainData);
      // setCaptainData(newCaptainData);
    
      setEmail('');
      setPassword('');
    }
  return (
    <>
    <div className="w-full flex flex-col items-center bg-gray-50 min-h-screen py-4">
      <div className="flex justify-center items-center py-6">
        <img
          src="https://cdn.iconscout.com/icon/free/png-512/free-online-cab-booking-icon-download-in-svg-png-gif-file-formats--apps-application-driver-public-transportation-pack-vehicle-icons-1380415.png?f=webp&w=256"
          alt="BikeBee Logo"
          className="h-12 md:h-16 rounded-full"
        />
      </div>

      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-center text-black">
          Welcome Back to BikeBee
        </h2>
        <form className="mt-4" onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <div>
            <label
              className="block text-sm font-semibold text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full bg-[#eeeeee] p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-black"
              type="email"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-sm font-semibold text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full bg-[#eeeeee] p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-black"
              type="password"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="w-full p-2 mt-6 text-white font-bold bg-black rounded hover:bg-gray-800"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Join a fleet?{' '}
          <a href="/captain-signup" className="text-black hover:underline">
            Sign up as a Captain
          </a>
        </p>
      </div>
      <div className="w-full fixed bottom-24 bg-white py-4 shadow-md flex justify-center items-center">
        <a
          href="/login"
          className="w-3/4 md:w-1/4 p-2 flex justify-center items-center text-white font-bold bg-orange-500 rounded hover:bg-green-800"
        >
          Login as a  User
        </a>
      </div>
    </div>
  </>
  )
}

export default CaptainLogin