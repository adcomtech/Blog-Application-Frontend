import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../utilities/baseURL';

// ACTION TYPES
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const FETCH_CATEGORY = 'FETCH_CATEGORY';
const FETCH_CATEGORY_DETAILS = 'FETCH_CATEGORY_DETAILS';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

const CATEGORY_RESET_CREATE = 'CATEGORY_RESET_CREATE';
const CATEGORY_RESET_EDIT = 'CATEGORY_RESET_EDIT';
const CATEGORY_RESET_DELETE = 'CATEGORY_RESET_DELETE';

// An Action that will Reset Updated or Deleted State
const resetCreateAction = createAction(CATEGORY_RESET_CREATE);
const resetEditAction = createAction(CATEGORY_RESET_EDIT);
const resetDeleteAction = createAction(CATEGORY_RESET_DELETE);

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

      // dispatch
      dispatch(resetCreateAction());

      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error?.response?.data);
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

// //// Update Category Action Creator
export const fetchCategoryDetailsAction = createAsyncThunk(
  FETCH_CATEGORY_DETAILS,
  async (id, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.get(`${baseURL}/category/${id}`, config);

      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

// //// Update Category Action Creator
export const updateCategoryAction = createAsyncThunk(
  UPDATE_CATEGORY,
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
      const { data } = await axios.put(
        `${baseURL}/category/${category?.id}`,
        { title: category.title },
        config
      );

      // Dispatch Reset Action
      dispatch(resetEditAction());

      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

// //// Update Category Action Creator
export const deleteCategoryAction = createAsyncThunk(
  DELETE_CATEGORY,
  async (id, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.delete(`${baseURL}/category/${id}`, config);

      // Dispatch Reset Action
      dispatch(resetDeleteAction());

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

    // Builder for Redirect
    builder.addCase(resetCreateAction, (state, action) => {
      state.isCategoryCreated = true;
    });

    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.isCategoryCreated = false;

      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Get Categories Case
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
      state.serverError = action?.error?.message;
    });

    // Get Category Case
    builder.addCase(fetchCategoryDetailsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchCategoryDetailsAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(fetchCategoryDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Update Category Case
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    // Builder for Redirect
    builder.addCase(resetEditAction, (state, action) => {
      state.isCategoryEdited = true;
    });

    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.updatedCategory = action?.payload;
      state.isCategoryEdited = false;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Delete Category Case
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    // Builder for Redirect
    builder.addCase(resetDeleteAction, (state, action) => {
      state.isCategoryDeleted = true;
    });

    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.deletedCategory = action?.payload;
      state.isCategoryDeleted = false;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default categorySlices.reducer;
