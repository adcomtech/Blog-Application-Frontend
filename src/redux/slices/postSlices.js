import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../utilities/baseURL';

// Action Types
const CREATE_POST = 'CREATE_POST';
const CREATE_POST_RESET_ACTION = 'CREATE_POST_RESET_ACTION';
const FETCH_POST = 'FETCH_POST';
const FETCH_POST_DETAILS = 'FETCH_POST_DETAILS';
const POST_LIKES_ACTION = 'POST_LIKES_ACTION';
const POST_DISLIKES_ACTION = 'POST_DISLIKES_ACTION';
const UPDATE_POST_ACTION = 'UPDATE_POST_ACTION';
const UPDATE_POST_RESET_ACTION = 'UPDATE_POST_RESET_ACTION';
const DELETE_POST_ACTION = 'DELETE_POST_ACTION';
const DELETE_POST_RESET_ACTION = 'DELETE_POST_RESET_ACTION';

// CUSTOM ACTION TO RESET POST
const resetCreatedPost = createAction(CREATE_POST_RESET_ACTION);
const resetUpdatedPost = createAction(UPDATE_POST_RESET_ACTION);
const resetDeletedPost = createAction(DELETE_POST_RESET_ACTION);

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
      formPostData.append('category', post?.category);
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

// ACTION CREATOR TO FETCH POSTS
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

// ACTION CREATOR TO FETCH POST DETAILS
export const fetchPostDetailsAction = createAsyncThunk(
  FETCH_POST_DETAILS,
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/posts/${postId}`);

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ACTION CREATOR TO ADD LIKES TO POST
export const createPostLikesAction = createAsyncThunk(
  POST_LIKES_ACTION,
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const user = getState().users;
    const { loggedInUser } = user;

    // Get Authrization from Header
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseURL}/posts/likes`,
        { postId },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ACTION TO ADD DISLIKES TO POST
export const createPostDisLikesAction = createAsyncThunk(
  POST_DISLIKES_ACTION,
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const user = getState().users;
    const { loggedInUser } = user;

    // Get Authrization from Header
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseURL}/posts/dislikes`,
        { postId },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ACTION CREATOR FOR UPDATING POST
export const updatePostAction = createAsyncThunk(
  UPDATE_POST_ACTION,
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
      const { data } = await axios.put(
        `${baseURL}/posts/${post?.postId}`,
        post,
        config
      );

      // RESET CREATED POST
      dispatch(resetUpdatedPost());

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ACTION CREATOR FOR DELETING POST
export const deletePostAction = createAsyncThunk(
  DELETE_POST_ACTION,
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const user = getState().users;
    const { loggedInUser } = user;

    // Get Authrization from Header
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    try {
      const { data } = await axios.delete(`${baseURL}/posts/${postId}`, config);

      // RESET CREATED POST
      dispatch(resetDeletedPost());

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// POST SLICES
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
      state.updatedPost = action?.payload;
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

    // Get POsts Details
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Get POsts Likes
    builder.addCase(createPostLikesAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createPostLikesAction.fulfilled, (state, action) => {
      state.likes = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(createPostLikesAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Get POsts DisLikes
    builder.addCase(createPostDisLikesAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createPostDisLikesAction.fulfilled, (state, action) => {
      state.dislikes = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(createPostDisLikesAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Update POst
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetUpdatedPost, (state, action) => {
      state.isPostUpdated = true;
    });

    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.updatedPost = action?.payload;
      state.isPostUpdated = false;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Delete POst
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetDeletedPost, (state, action) => {
      state.isPostDeleted = true;
    });

    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.deletedPost = action?.payload;
      state.isPostDeleted = false;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default postSlices.reducer;
