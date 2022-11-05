import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import feedsReducer from './slices/feedsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        feeds: feedsReducer,
    },
});
