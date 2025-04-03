/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserWrapper({ children }) {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, setUser]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}

export default UserWrapper;