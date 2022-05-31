import React from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from '../navigation/MainNav';

export const Header = () => {
  return (
    <header className='header'>
      <nav className='container'>
        <div className='logo'>AdcomtechBlog</div>

        <div className='nav--item'>
          <MainNav />
        </div>
      </nav>

      <div className='header-container'>
        <div className='header-container-inner'>
          <h1>A Blog Application for Reliable Information</h1>
          <p className='hero-text'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            tempore velit asperiores magni.
          </p>
          <Link to='#' className='btn'>
            Explore Now
          </Link>
        </div>
      </div>
    </header>
  );
};
