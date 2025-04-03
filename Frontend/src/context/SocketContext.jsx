// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
function SocketProvider({ children }) {
  const socket = io(import.meta.env.VITE_BASE_URL);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;