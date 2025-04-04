/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const fetchCaptainData = async (token, setCaptain, navigate, setIsLoading) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            setCaptain(response.data.captain);
        }
    } catch (err) {
        console.error("Error fetching captain data:", err);
        localStorage.removeItem('token');
        navigate('/captain-login');
    } finally {
        setIsLoading(false);
    }
};

function CaptainWrapper({ children }) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }
        fetchCaptainData(token, setCaptain, navigate, setIsLoading);
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}

export default CaptainWrapper;
