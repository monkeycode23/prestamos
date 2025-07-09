

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
 import formReducer from './slices/formSlice'; // Uncomment if you have a formSlice 
 import paginationReducer from './slices/pagination'  
 import modalReducer from './slices/modalSlice'    
const store = configureStore({
    reducer: {
        auth: authReducer,
        form: formReducer, // Uncomment if you have a formSlice
        pagination:paginationReducer,
        modal:modalReducer
    },
});

export default store;   