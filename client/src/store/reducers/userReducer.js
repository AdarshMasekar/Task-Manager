import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from '../../API/api'

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post('/api/user/signup', userData);
      const data = await response.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post('/api/user/signin', userData);
      const data = await response.data;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ? [err.response?.data?.message] : ["Failed to login.Invalid credentials!"]);
    }
  }
);

// Async thunk for updating user profile
export const updateUserAsync = createAsyncThunk(
    'user/update',
    async (userData, thunkAPI) => {
        try {
            const response = await apiClient.put('/api/user/update', userData, {
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
            const response = await apiClient.put('/api/user/change-password', passwords, {
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
  data:JSON.parse(localStorage.getItem("userDetails")) || null,
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
      localStorage.removeItem('userDetails');
    },
    setErrors: (state, action) => {
        state.error = action.payload;
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
        state.error.push(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.userDetails;
        state.authToken = action.payload.token;
        localStorage.setItem('userDetails',JSON.stringify(state.data))
        localStorage.setItem('token', state.authToken);
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      })
        .addCase(updateUserAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUserAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.updatedUser;
            localStorage.setItem('userDetails',JSON.stringify(state.data))
            localStorage.setItem('token', state.authToken);
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
export const { setErrors } = userSlice.actions;
export const selectUser = (state) => state.user;
export const selectIsRegistered = (state) => state.user.isRegistered;
const userReducer = userSlice.reducer;
export default userReducer;
