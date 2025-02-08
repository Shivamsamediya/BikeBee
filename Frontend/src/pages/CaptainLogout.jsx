// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CaptainLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const logoutCaptain = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error("Logout failed:", error);
            } finally {
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        };

        logoutCaptain();
    }, [navigate]);

    return <div>Logging out...</div>; // Better UX feedback
}

export default CaptainLogout;
