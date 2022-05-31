import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { ErrorPage } from './components/pages/ErrorPage';

import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { PostDetailPage } from './components/pages/PostDetailPage';
import { PostsPage } from './components/pages/PostsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { Register } from './components/pages/Register';
import { SharedLayout } from './components/templates/SharedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path='posts' element={<PostsPage />} />
          <Route path='posts/:postId' element={<PostDetailPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
