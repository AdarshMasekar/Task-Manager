import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from '../../API/api'

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, thunkAPI) => {
        try {
            const response = await apiClient.get('/api/tasks');
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

// Async thunk for adding a task
export const addTaskAsync = createAsyncThunk(
    'tasks/addTask',
    async (taskData, thunkAPI) => {
        try {
            const response = await apiClient.post('/api/tasks', taskData);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

// Async thunk for updating a task
export const updateTaskAsync = createAsyncThunk(
    'tasks/updateTask',
    async ({ taskId, updates }, thunkAPI) => {
        try {
            const response = await apiClient.put(`/api/tasks/${taskId}`, updates);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

// Async thunk for removing a task
export const removeTaskAsync = createAsyncThunk(
    'tasks/removeTask',
    async (taskId, thunkAPI) => {
        try {
            const response = await apiClient.delete(`/api/tasks/${taskId}`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearTasks: (state) => {
            state.tasks = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTask = action.payload;
                state.tasks = state.tasks.map(task => task._id === updatedTask._id ? updatedTask : task);
            })
            .addCase(updateTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(removeTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                const deletedTask = action.payload;
                state.tasks = state.tasks.filter(task => task._id !== deletedTask._id);
            })
            .addCase(removeTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const selectTasks = (state) => state.tasks;
export const { clearTasks } = taskSlice.actions;
const taskReducer = taskSlice.reducer;
export default taskReducer;
