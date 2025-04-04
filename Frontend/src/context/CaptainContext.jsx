/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { createContext, useState } from 'react';
export const CaptainDataContext = createContext();

function CaptainContext({ children }) {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
      setCaptain(captainData);
  };

  const handleError = (errorMessage) => {
      setError(errorMessage);
  };

  const value = {
      captain,
      setCaptain,
      isLoading,
      setIsLoading,
      error,
      setError,
      updateCaptain,
      handleError, 
  };

    
  return (
    <CaptainDataContext.Provider value={value}>
        {children}
    </CaptainDataContext.Provider>
  );
}

export default CaptainContext;