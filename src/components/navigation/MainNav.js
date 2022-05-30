import React from 'react';
import { useSelector } from 'react-redux';

import { AdminNav } from './AdminNav';
import { PrivateNav } from './PrivateNav';
import { PublicNav } from './PublicNav';

export const MainNav = () => {
  // Get User From Store

  const store = useSelector(state => state?.users);
  const { loggedInUser } = store;
  const isAdmin = loggedInUser?.user?.isAdmin;
  console.log(isAdmin);

  return (
    <>
      {/* Displaying NavBar Based on the Logged In User */}

      {/* {!loggedInUser ? (
        <PublicNav />
      ) : loggedInUser ? (
        <PrivateNav />
      ) : isAdmin && (
        <AdminNav />
      ) } */}

      {isAdmin ? <AdminNav /> : loggedInUser ? <PrivateNav /> : <PublicNav />}
    </>
  );
};
