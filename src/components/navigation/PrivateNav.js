import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogoutAction } from '../../redux/slices/usersSlices';

export const PrivateNav = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h4>Private Nav</h4>
      <button onClick={() => dispatch(userLogoutAction())}>Logout</button>
    </div>
  );
};
