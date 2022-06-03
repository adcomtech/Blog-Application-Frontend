import React from 'react';
import { useSelector } from 'react-redux';

import { AdminNav } from './AdminNav';
import { PrivateNav } from './PrivateNav';
import { PublicNav } from './PublicNav';

export const MainNav = () => {
  // Get User From Store

  const store = useSelector(state => state?.users);
  const { loggedInUser } = store;
  // const isAdmin = loggedInUser.user.isAdmin;

  let admin;
  if (loggedInUser && loggedInUser.user.role === 'admin') {
    admin = true;
    console.log('Yeah its an Admin');
  }
  return (
    <>
      {/* Displaying NavBar Based on the Logged In User */}

      {admin ? <AdminNav /> : loggedInUser ? <PrivateNav /> : <PublicNav />}
    </>
  );
};
