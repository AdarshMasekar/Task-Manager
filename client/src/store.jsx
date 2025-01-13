import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/reduceres/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;