import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Header } from './Header';

export const AdminLayout = () => {
  <div className='grid-container'>
    <Header />

    <main>
      <Outlet />
    </main>

    <Footer />
  </div>;
};
