import { createSlice } from '@reduxjs/toolkit';
import { isSession } from 'react-router';


const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
};
// This is the authSlice for managing authentication state in the Redux store
// It includes actions for logging in, setting user data, authentication status, loading state, and error handling
const getTokenFromLocalStorage = () => {
    // Retrieve the token from localStorage     
    const token = localStorage.getItem('authToken');
    // If the token exists, return it; otherwise, return null
    return token ? token : null;
};  

   const initialState = {      
          user: getUserFromLocalStorage(),

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
            logout: (state, action) => {
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
  state.isLoading = false;
  state.error = null;
  window.localStorage.removeItem('authToken');
  window.localStorage.removeItem('authUser');
},
setIsSessionExpired: async (state,action) => {
  try {
    state.isSessionExpired = action.payload;
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('authUser');
  } catch (error) {
    console.log(error)
  }
},
 login: (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAuthenticated = true;
  state.isLoading = false;
  state.error = null;
  state.isSessionExpired = false;
  window.localStorage.setItem('authToken', action.payload.token);
  window.localStorage.setItem('authUser', JSON.stringify(action.payload.user));
},
changeAvatar:(state, action) => {
    console.log(action.payload,"wtfdude")

    state.user.avatar = action.payload

  const user = JSON.parse(window.localStorage.getItem('authUser'));

  user.avatar =  action.payload

    window.localStorage.setItem('authUser', JSON.stringify(user));


   // console.log(state.user)
},
setUser: (state, action) => {
  state.user = action.payload;
  window.localStorage.setItem('authUser', JSON.stringify(action.payload));
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

    export const { setUser, setIsAuthenticated, setIsLoading, setError,login,setIsSessionExpired,logout,changeAvatar } = authSlice.actions;
    export default authSlice.reducer;




