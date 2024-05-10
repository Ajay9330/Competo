// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    userLoginData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserLoginData: (state, action) => {
      state.userLoginData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
      state.userLoginData = null;
    },
  },
});

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: false,
    message : "",
    messageType : "" // can be 'error', 'success', or 'normal'
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMessageType: (state, action) => {
      state.messageType = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
      state.messageType = null;
    },
  },
});

export const {
  setLoading,
  setMessage,
  setMessageType,
  clearMessage,
} = loadingSlice.actions;

export const selectLoading = (state) => state.loading.loading;
export const selectMessage = (state) => state.loading.message;
export const selectMessageType = (state) => state.loading.messageType;

export const { clearUser, setUserData, setUserLoginData } = userSlice.actions;

export const selectUser = (state) => state.user.userLoginData;
export const selectUserdata = (state) => state.user.userData;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loading: loadingSlice.reducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
