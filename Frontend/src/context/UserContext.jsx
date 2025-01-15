/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import React, { createContext, useState } from 'react';
export const UserDataContext = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState({
    fullName: {
      firstName: '',
      lastName: '',
    },
    email: '',
  });

  return (
    <UserDataContext.Provider value={[user, setUser]}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
