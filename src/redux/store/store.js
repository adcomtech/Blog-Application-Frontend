import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlices';
import categoryReducer from '../slices/categorySlices';

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoryReducer,
  },
});

export default store;
