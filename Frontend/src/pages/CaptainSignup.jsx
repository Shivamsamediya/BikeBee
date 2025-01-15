/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function CaptainSignup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCaptainData = {
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    }; 

    console.log(newCaptainData);
    setCaptainData(newCaptainData)
    setFirstName('');setLastName('');setEmail('');setPassword('');
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-between">
        <div className="flex justify-center items-center py-4">
          <img
            src="https://files.oaiusercontent.com/file-TaFuR9e1vHty2dWZu8a5Rh?se=2025-01-14T12%3A25%3A54Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De37e4ad1-4ddd-4b3c-870b-2a673e89919a.webp&sig=2lJgYfUaFkf0KxFXbRy41UUzstWNcK3vCXEWcgMpCI0%3D"
            alt="BikeBee Logo"
            className="h-16 rounded-full"
          />
        </div>
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md overflow-y-auto flex-1">
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
            <button
              className="w-full p-2 mt-6 text-white font-bold bg-black rounded hover:bg-gray-800"
              type="submit"
            >
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
          <a
            href="/signup"
            className="w-3/4 md:w-1/4 p-2 flex justify-center items-center text-white font-bold bg-orange-500 rounded hover:bg-green-800"
          >
            Sign Up as a User
          </a>
        </div>
      </div>
    </>
  );
}

export default CaptainSignup;
