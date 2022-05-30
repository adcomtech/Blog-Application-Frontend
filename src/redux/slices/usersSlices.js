import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../utilities/baseURL';

// ACTION TYPES
const USER_REGISTER = 'USER_REGISTER';
const USER_LOGIN = 'USER_LOGIN';

// configuration
const actionConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
    },
  };
  return config;
};
// User Registration Actio
/////////////////////////////////////////
export const userRegistrationAction = createAsyncThunk(
  // this function accepts action type, function that accepts payload which UserData
  USER_REGISTER,
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/users/signup`,
        user,
        actionConfig()
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// User Login Action
////////////////////////////
export const userLoginAction = createAsyncThunk(
  USER_LOGIN,
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      // Http call to our API
      const { data } = await axios.post(
        `${baseURL}/users/login`,
        userData,
        actionConfig()
      );
      // Save the user into local Storage
      localStorage.setItem('userLoginData', JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      // pass the error to the reject value
      return rejectWithValue(error.response.data);
    }
  }
); //

// Get Logged In User from Local Storage which will be passed as Initial State
const getUserData = localStorage.getItem('userLoginData');
const loggedInUserData = getUserData ? JSON.parse(getUserData) : null;

// creating slices which takes "name of slice, initial state as object" and reducers as function which accepts builder parameter

const usersSlices = createSlice({
  name: 'users',
  initialState: {
    loggedInUser: loggedInUserData,
  },

  extraReducers: builder => {
    // User Registration Reducer Cases

    builder.addCase(userRegistrationAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(userRegistrationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(userRegistrationAction.rejected, (state, action) => {
      state.loading = false;
      // displaying error
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // User Login Reducer Cases

    builder.addCase(userLoginAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(userLoginAction.rejected, (state, action) => {
      state.loading = false;
      // displaying error
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default usersSlices.reducer;
