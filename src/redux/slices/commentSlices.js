import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../utilities/baseURL';

// ACTION TYPES
const CREATE_COMMENT_ACTION = 'CREATE_COMMENT_ACTION';
const FETCH_COMMENT_ACTION = 'FETCH_COMMENT_ACTION';
const DELETE_COMMENT_ACTION = 'DELETE_COMMENT_ACTION';
const UPDATE_COMMENT_ACTION = ' UPDATE_COMMENT_ACTION';
const RESET_UPDATED_COMMENT_ACTION = 'RESET_UPDATED_COMMENT_ACTION';

const resetUpdateCommentAction = createAction(RESET_UPDATED_COMMENT_ACTION);

// //// Create Comment Action Creator
export const createCommentAction = createAsyncThunk(
  CREATE_COMMENT_ACTION,
  async (comment, { rejectWithValue, getState, dispatch }) => {
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
        `${baseURL}/comments`,
        {
          postId: comment?.postId,
          description: comment.description,
        },
        config
      );

      //   // dispatch
      //   dispatch(resetCreateAction());

      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error?.response?.data);
    }
  }
);

// //// Fetch Comment Action Creator
export const fetchCommentAction = createAsyncThunk(
  FETCH_COMMENT_ACTION,
  async (commentId, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.get(
        `${baseURL}/comments/${commentId}`,
        config
      );

      //   // dispatch
      //   dispatch(resetCreateAction());

      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error?.response?.data);
    }
  }
);

// //// Update Comment Action Creator
export const updateCommentAction = createAsyncThunk(
  UPDATE_COMMENT_ACTION,
  async (comment, { rejectWithValue, getState, dispatch }) => {
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
        `${baseURL}/comments/${comment?.id}`,
        { description: comment?.description },
        config
      );

      // Dispatch Reset Action
      dispatch(resetUpdateCommentAction());

      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

// //// Delete Comment Action Creator
export const deleteCommentAction = createAsyncThunk(
  DELETE_COMMENT_ACTION,
  async (commentId, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.delete(
        `${baseURL}/comments/${commentId}`,
        config
      );

      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlices = createSlice({
  name: 'comment',
  initialState: {},
  extraReducers: builder => {
    // Create Comment Case
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    // // Builder for Redirect
    // builder.addCase(resetCreateAction, (state, action) => {
    //   state.isCategoryCreated = true;
    // });

    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.commentCreated = action?.payload;
      // state.isCategoryCreated = false;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = undefined;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //Fetch Comment Case
    builder.addCase(fetchCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchCommentAction.fulfilled, (state, action) => {
      state.commentDetails = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(fetchCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //Update Comment Case
    builder.addCase(updateCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    // // Builder for Redirect
    builder.addCase(resetUpdateCommentAction, (state, action) => {
      state.isCommentUpdated = true;
    });

    builder.addCase(updateCommentAction.fulfilled, (state, action) => {
      state.commentUpdated = action?.payload;
      state.isCommentUpdated = false;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(updateCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Delete Comment Case
    builder.addCase(deleteCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.commentDeleted = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(deleteCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default commentSlices.reducer;
