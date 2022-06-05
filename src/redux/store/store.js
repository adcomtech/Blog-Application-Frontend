import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlices';
import categoryReducer from '../slices/categorySlices';
import postReducer from '../slices/postSlices';

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoryReducer,
    post: postReducer,
  },
});

export default store;
