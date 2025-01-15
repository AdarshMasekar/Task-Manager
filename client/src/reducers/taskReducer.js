import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../api/api';

const INITIAL_STATE = {
  tasks: [],
  task: null,
  loading: null,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    try {
      const response = await apiClient.get('/tasks');
      const data = await response.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err.response?.data || 'Error fetching task');
    }
  }
)

export const addTaskAsync = createAsyncThunk(
  'tasks/addTask',
  async (task, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/tasks', task);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error adding task');
    }
  }
);

export const removeTaskAsync = createAsyncThunk(
  'tasks/removeTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error removing task');
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async (task, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/tasks/${task.id}`, task); // Adjust endpoint as needed
      return response.data; // Assuming response contains the updated task
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error updating task');
    }
  }
);

// Task Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState: INITIAL_STATE,
  reducers: {}, // No local reducers needed
  extraReducers: (builder) => {
    // Add Task
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(removeTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(removeTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Task
    builder
      .addCase(updateTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Tasks (Keep existing logic)
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

// Export Actions and Reducer
export const taskSelector = (state) => state.tasks;
const taskReducer = taskSlice.reducer;
export default taskReducer;
