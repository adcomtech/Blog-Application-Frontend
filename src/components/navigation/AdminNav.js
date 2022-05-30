import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogoutAction } from '../../redux/slices/usersSlices';
export const AdminNav = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Admin Nav</h1>

      <button onClick={() => dispatch(userLogoutAction())}>Logout</button>
    </div>
  );
};
