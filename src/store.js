import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerSlice.js';

export default configureStore({
    reducer: {
        timer: timerReducer,
    },
})