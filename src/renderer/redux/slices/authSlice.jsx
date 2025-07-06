import { createSlice } from '@reduxjs/toolkit';
import { isSession } from 'react-router';


// This is the authSlice for managing authentication state in the Redux store
// It includes actions for logging in, setting user data, authentication status, loading state, and error handling
const getTokenFromLocalStorage = () => {
    // Retrieve the token from localStorage     
    const token = localStorage.getItem('authToken');
    // If the token exists, return it; otherwise, return null
    return token ? JSON.parse(token) : null;
};  

   const initialState = {      
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        token: getTokenFromLocalStorage(), // Add token to the initial state
        isSessionExpired: false, // Add isSessionExpired to the initial state
    };

    const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            setIsSessionExpired: async (state,action) => {

               state.isSessionExpired =action.payload; // Set isSessionExpired to true
                // This action can be used to handle token expiration logic
                window.localStorage.removeItem("authToken")
                // Optionally, remove the token from localStorage
            },
            logout:(state, action) => {
                 state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = null;

                

                window.localStorage.removeItem('authToken'); // Store token in localStorage
            },
            login: (state, action) => {
                 state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.error = null;

                

                window.localStorage.setItem('authToken', JSON.stringify(action.payload.token)); // Store token in localStorage
            },
            setUser: (state, action) => {
                state.user = action.payload;
            },
            setIsAuthenticated: (state, action) => {
                state.isAuthenticated = action.payload;
            },
            setIsLoading: (state, action) => {
                state.isLoading = action.payload;
            },
            setError: (state, action) => {
                state.error = action.payload;
            },
        },
    });

    export const { setUser, setIsAuthenticated, setIsLoading, setError,login,setIsSessionExpired,logout } = authSlice.actions;
    export default authSlice.reducer;




