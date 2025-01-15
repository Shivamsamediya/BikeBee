/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserLogin() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const {user,setUser} = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const newUserData = {
      email: email,
      password: password,
    };

    console.log(newUserData);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,newUserData);

    if(response.status ===  200){
      const data = response.data;

      setUser(data.user);

      localStorage.setItem('token',data.token);

      navigate('/home');
    }
    
    // console.log(newUserData);
    // setUserData(newUserData);
  
    setEmail('');
    setPassword('');
  };
  
  return (
    <>
      <div className="w-full flex flex-col items-center bg-gray-50 min-h-screen py-4">
        <div className="flex justify-center items-center py-6">
          <img
            src="https://files.oaiusercontent.com/file-TaFuR9e1vHty2dWZu8a5Rh?se=2025-01-14T12%3A25%3A54Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De37e4ad1-4ddd-4b3c-870b-2a673e89919a.webp&sig=2lJgYfUaFkf0KxFXbRy41UUzstWNcK3vCXEWcgMpCI0%3D"
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
            Don’t have an account?{' '}
            <a href="/signup" className="text-black hover:underline">
              Sign up
            </a>
          </p>
        </div>
        <div className="w-full fixed bottom-24 bg-white py-4 shadow-md flex justify-center items-center">
          <a
            href="/captain-login"
            className="w-3/4 md:w-1/4 p-2 flex justify-center items-center text-white font-bold bg-green-500 rounded hover:bg-green-800"
          >
            Login as a Captain
          </a>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
