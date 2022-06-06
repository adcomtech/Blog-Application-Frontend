import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
  // check if user is logged in
  const user = useSelector(state => state?.users);
  const { loggedInUser } = user;

  if (loggedInUser !== null) {
    const isAuthenticated = loggedInUser;
    return isAuthenticated ? <Outlet /> : null; // or loading indicator, etc...
  }
  return <Navigate to={'/login'} replace />;
};
