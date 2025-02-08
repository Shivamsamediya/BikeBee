/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const logoutUser = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging out...</div>; // Shows a message while logging out
}

export default UserLogout;
