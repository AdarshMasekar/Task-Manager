import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from '../api/api'

// Async thunk for the user register
export const registerThunk = createAsyncThunk(
  'user/register',
  async (userCredentials, thunkAPI) => {
    try {
      console.log(userCredentials)
      const response = await apiClient.post('/user/signup', userCredentials);
      const data = await response.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error);
    }
  });

// Async thunk for the user login
export const loginThunk = createAsyncThunk(
  'user/login',
  async (userCredentials, thunkAPI) => {
    try {
      const response = await apiClient.post('/user/signin', userCredentials);
      const data = await response.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error);
    }
  }
);

// Initial state for the user reducer
const INITIAL_STATE = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
    })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.userDetails;
        state.token = action.payload.token;
        localStorage.setItem('token', state.token);
        state.loading = false;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const userActions = userSlice.actions;
export const userSelector = (state) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
