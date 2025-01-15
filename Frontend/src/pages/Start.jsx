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
            src="https://files.oaiusercontent.com/file-TaFuR9e1vHty2dWZu8a5Rh?se=2025-01-14T12%3A25%3A54Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De37e4ad1-4ddd-4b3c-870b-2a673e89919a.webp&sig=2lJgYfUaFkf0KxFXbRy41UUzstWNcK3vCXEWcgMpCI0%3D"
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
