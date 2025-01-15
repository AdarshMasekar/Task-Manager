import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from '../api/api'

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post('/user/signup', userData);
      const data = await response.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post('/user/signin', userData);
      const data = await response.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error);
    }
  }
);

// Initial state for the user slice
const initialState = {
  data: null,
  authToken: localStorage.getItem('token') || null,
  loading: false,
  isRegistered:false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.data = null;
      state.authToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.userDetails;
        state.token = action.payload.token;
        localStorage.setItem('token', state.token);
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
