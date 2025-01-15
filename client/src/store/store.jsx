import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import taskReducer from './reducers/taskReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  }
});

export default store;
