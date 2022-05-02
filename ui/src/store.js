import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import blogReducer from './features/blogSlice';
import api from './services/api';

export const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})