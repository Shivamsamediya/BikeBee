/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { UserDataContext } from '../context/UserContext'

const Start = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  // const ans = useContext(UserDataContext);
  // console.log(ans);

  return (
    <>
      <div
        className="h-screen flex flex-col bg-gray-50 bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="w-full flex justify-start px-4 py-4">
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-online-cab-booking-icon-download-in-svg-png-gif-file-formats--apps-application-driver-public-transportation-pack-vehicle-icons-1380415.png?f=webp&w=256"
            alt="BikeBee Logo"
            className="h-12 md:h-16 rounded-full"
          />
        </div>

        <div className="flex-grow flex items-end">
          <div className="flex flex-col items-center w-full bg-white p-4 md:p-6 shadow-md">
            <div className="text-center text-lg md:text-xl font-bold text-black mb-4">
              Get Started with BikeBee
            </div>

            <button
              onClick={handleContinue}
              className="bg-black text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-md hover:bg-gray-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;
