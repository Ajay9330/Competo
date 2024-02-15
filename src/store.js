// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    // Add other reducers if needed
  },
});

export default store;
