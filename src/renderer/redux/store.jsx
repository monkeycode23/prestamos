

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
 import formReducer from './slices/formSlice'; // Uncomment if you have a formSlice       
const store = configureStore({
    reducer: {
        auth: authReducer,
        form: formReducer, // Uncomment if you have a formSlice
    },
});

export default store;   