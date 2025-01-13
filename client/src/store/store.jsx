import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;
