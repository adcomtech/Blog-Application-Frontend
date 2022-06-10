import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { userLogoutAction } from '../../redux/slices/usersSlices';

export const PrivateNav = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(userLogoutAction());

    // Redirect to Home page
    navigate('/');
  };

  return (
    <>
      <NavLink
        to='/'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Home
      </NavLink>

      <NavLink
        to='/create-post'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Create Post
      </NavLink>

      <NavLink
        to='/posts'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Posts List
      </NavLink>

      <NavLink
        to='/about'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        About Us
      </NavLink>

      <NavLink
        to='/contact'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Contact Us
      </NavLink>

      <Link to='#' onClick={logoutHandler}>
        Logout
      </Link>

      <NavLink
        to='/login'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Profile
      </NavLink>
    </>
  );
};
