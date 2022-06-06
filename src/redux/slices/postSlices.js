import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../utilities/baseURL';

// Action Types
const CREATE_POST = 'CREATE_POST';
const FETCH_POST = 'FETCH_POST';
const CREATE_POST_ACTION = 'CREATE_POST_ACTION';

// CUSTOM ACTION TO RESET POST
const resetCreatedPost = createAction(CREATE_POST_ACTION);

// ACTION CREATOR
export const createPostAction = createAsyncThunk(
  CREATE_POST,
  async (post, { rejectWithValue, getState, dispatch }) => {
    const user = getState().users;
    const { loggedInUser } = user;

    // Get Authrization from Header
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    try {
      const formPostData = new FormData();
      formPostData.append('title', post?.title);
      formPostData.append('description', post?.description);
      formPostData.append('category', post?.categoryId);
      formPostData.append('image', post?.image);
      const { data } = await axios.post(
        `${baseURL}/posts`,
        formPostData,
        config
      );

      // RESET CREATED POST
      dispatch(resetCreatedPost());

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ACTION CREATOR
export const fetchPostsAction = createAsyncThunk(
  FETCH_POST,
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/posts?category=${category}`);

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const postSlices = createSlice({
  name: 'post',
  initialState: {},
  extraReducers: builder => {
    // Create POst
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetCreatedPost, (state, action) => {
      state.isPostCreated = true;
    });

    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.createdPost = action?.payload;
      state.isPostCreated = false;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Get POsts
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.postLists = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default postSlices.reducer;
