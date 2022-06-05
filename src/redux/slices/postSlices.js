import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../utilities/baseURL';

// Action Types
const CREATE_POST = 'CREATE_POST';

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
      // const { data } = await axios.post(`${baseURL}/posts`, post, config);
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
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.createdPost = action?.payload;
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default postSlices.reducer;
