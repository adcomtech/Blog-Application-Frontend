import React from 'react';
import { MainNav } from '../navigation/MainNav';

export const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <h1>AdcomtechBlog</h1>
      </div>
      <nav>
        <MainNav />
      </nav>
    </header>
  );
};
