import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from '../../api/api'

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post('/user/signup', userData);
      const data = await response.data;
      return data;
    } catch (err) {
        console.log(err)
      return thunkAPI.rejectWithValue(err.response?.data?.message);
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
      console.log(data)
      return data;
    } catch (err) {
        console.log(err)
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Async thunk for updating user profile
export const updateUserAsync = createAsyncThunk(
    'user/update',
    async (userData, thunkAPI) => {
        try {
            const response = await apiClient.put('/user/update', userData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update profile.");
        }
    }
);

// Async thunk for changing user password
export const changePasswordAsync = createAsyncThunk(
    'user/changePassword',
    async (passwords, thunkAPI) => {
        try {
            const response = await apiClient.put('/user/change-password', passwords, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to change password.");
        }
    }
);

// Initial state for the user slice
const initialState = {
  data: null,
  authToken: localStorage.getItem('token') || null,
  loading: false,
  isRegistered:false,
  error: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.data = null;
      state.authToken = null;
      state.loading = false;
      state.error = [];
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
        console.log(action.payload)
        state.error = [action.payload];
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload.userDetails)
        state.user = action.payload.userDetails;
        state.token = action.payload.token;
        localStorage.setItem('token', state.token);
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = [action.payload];
      })
        .addCase(updateUserAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUserAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.updatedUser;
            state.error = null;
        })
        .addCase(updateUserAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = [action.payload];
        })
        .addCase(changePasswordAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(changePasswordAsync.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(changePasswordAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = [action.payload];
        });
  }
});

export const { logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
