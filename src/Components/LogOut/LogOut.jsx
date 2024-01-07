import React, { useContext } from 'react';
import { LogInContext } from '../../Context/LogInContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const { logOut } = useContext(LogInContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(); // Call the logOut function from the context
    navigate("/");
  };

  return (
  
    <Button variant="contained" color="success" onClick={handleLogout}>
       Logout
  </Button>
  );
};

export default LogoutButton;
