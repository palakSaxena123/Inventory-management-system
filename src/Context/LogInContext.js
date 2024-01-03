import React, { createContext, useState, useEffect } from 'react';

const initialValue = {
  user: null,
  getUser: () => {},
  setUser: () => {},
  logOut: () => {},
};

export const LogInContext = createContext(initialValue);

export const LogInProvider = ({ children }) => {

  const [user, setUserState] = useState(() => {

    // Initialize user from local storage if available
    const storedUser = localStorage.getItem('LogInuser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (newUser) => {
    console.log('Setting user:', newUser);
    setUserState(newUser);

    // Save user information to local storage
    localStorage.setItem('LogInuser', JSON.stringify(newUser));
  };

  const getUser = () => {
    return user;
  };

  const logOut = () => {
    // Clear user information from state and local storage
    setUser(null);
    localStorage.removeItem('LogInuser');
  };

  const contextValue = {
    user,
    setUser,
    getUser,
    logOut,
  };

  return (
    <LogInContext.Provider value={contextValue}>
      {children}
    </LogInContext.Provider>
  );
};
