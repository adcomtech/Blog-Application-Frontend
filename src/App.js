import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/navigation/ProtectedRoute';
import { AboutPage } from './components/pages/AboutPage';
import { AddNewCategory } from './components/pages/AddNewCategory';
import { CategoryList } from './components/pages/CategoryList';
import { ContactPage } from './components/pages/ContactPage';
import { CreatePost } from './components/pages/CreatePost';
import { ErrorPage } from './components/pages/ErrorPage';

import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { PostDetailPage } from './components/pages/PostDetailPage';
import { UpdatePost } from './components/pages/UpdatePost';
import PostLists from './components/pages/PostLists';
import { ProfilePage } from './components/pages/ProfilePage';
import { Register } from './components/pages/Register';
import { UpdateCategory } from './components/pages/UpdateCategory';
import { UpdateComment } from './components/comments/UpdateComment';
import { SharedLayout } from './components/templates/SharedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='posts' element={<PostLists />} />
          <Route path='posts/:postId' element={<PostDetailPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='create-post' element={<CreatePost />} />
            <Route path='update-post/:postId' element={<UpdatePost />} />
            <Route path='admin/add-category' element={<AddNewCategory />} />
            <Route path='admin/category-list' element={<CategoryList />} />
            <Route
              path='admin/update-category/:id'
              element={<UpdateCategory />}
            />
            <Route path='update-comment/:id' element={<UpdateComment />} />
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
