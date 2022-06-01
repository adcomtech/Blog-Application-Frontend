import React from 'react';
import { NavLink } from 'react-router-dom';

export const PublicNav = () => {
  return (
    <>
      <NavLink
        to='/'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Home
      </NavLink>

      <NavLink
        to='/posts'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Posts
      </NavLink>

      <NavLink
        to='/register'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Register
      </NavLink>

      <NavLink
        to='/login'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Login
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
    </>
  );
};
