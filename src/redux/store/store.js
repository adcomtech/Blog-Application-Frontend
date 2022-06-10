import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlices';
import categoryReducer from '../slices/categorySlices';
import postReducer from '../slices/postSlices';
import commentReducer from '../slices/commentSlices';

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoryReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

export default store;
