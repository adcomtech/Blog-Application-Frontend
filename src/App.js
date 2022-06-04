import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/navigation/ProtectedRoute';
import { AboutPage } from './components/pages/AboutPage';
import { AddNewCategory } from './components/pages/AddNewCategory';
import { CategoryList } from './components/pages/CategoryList';
import { ContactPage } from './components/pages/ContactPage';
import { ErrorPage } from './components/pages/ErrorPage';

import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { PostDetailPage } from './components/pages/PostDetailPage';
import { PostsPage } from './components/pages/PostsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { Register } from './components/pages/Register';
import { UpdateCategory } from './components/pages/UpdateCategory';
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
          <Route element={<ProtectedRoute />}>
            <Route path='admin/add-category' element={<AddNewCategory />} />
            <Route path='admin/category-list' element={<CategoryList />} />
            <Route
              path='admin/update-category/:id'
              element={<UpdateCategory />}
            />
          </Route>

          {/* <Route path='admin' element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
          </Route> */}

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
