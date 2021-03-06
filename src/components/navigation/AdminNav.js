import React from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userLogoutAction } from '../../redux/slices/usersSlices';

export const AdminNav = () => {
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(userLogoutAction());

    // Redirect to Home page
    <Navigate to={'/'} replace />;
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
        Create
      </NavLink>

      <NavLink
        to='/posts'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Posts
      </NavLink>

      <NavLink
        to='/authors'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Authors
      </NavLink>

      <NavLink
        to='/admin/add-category'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Add Category
      </NavLink>

      <NavLink
        to='/admin/category-list'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Category List
      </NavLink>

      <NavLink
        to='/create-post'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        New Post
      </NavLink>

      <NavLink
        to='/profile'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Profile
      </NavLink>

      <Link to='#' onClick={logoutHandler}>
        Logout
      </Link>
    </>
  );
};
