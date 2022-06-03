import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../utilities/baseURL';

// ACTION TYPES
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const FETCH_CATEGORY = 'FETCH_CATEGORY';

// //// Create Category Action Creator
export const createCategoryAction = createAsyncThunk(
  CREATE_CATEGORY,
  async (category, { rejectWithValue, getState, dispatch }) => {
    // Get the Login User From the State and extract the token
    const user = getState().users;
    const { loggedInUser } = user;

    // Get Authrization from Header
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    try {
      // Http Call to Protected Route
      const { data } = await axios.post(
        `${baseURL}/category`,
        {
          title: category.title,
        },
        config
      );

      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

// //// Fetch Category Action Creator
export const fetchCategoryAction = createAsyncThunk(
  FETCH_CATEGORY,
  async (category, { rejectWithValue, getState, dispatch }) => {
    // Get the Login User From the State and extract the token
    const user = getState().users;
    const { loggedInUser } = user;

    // Get Authrization from Header
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    try {
      // Http Call to Protected Route
      const { data } = await axios.get(`${baseURL}/category`, config);

      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

/////////////////////////////////////////
// CREATING THE SLICES OR REDUCER

const categorySlices = createSlice({
  name: 'category',
  initialState: {},
  extraReducers: builder => {
    // Create Category Case
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action.error.message;
    });

    // Fetch Category Case
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.categoryList = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action.error.message;
    });
  },
});

export default categorySlices.reducer;
