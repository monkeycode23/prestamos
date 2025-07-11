
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  payments: [],  
    selectedPayment: null,
    selectedPayments:[],
    isLoading: false,
    error: null,    
};  



const paymentsSlice = createSlice({
  name: 'payments',    
    initialState,   
    reducers: { 
        setpayments: (state, action) => {
            state.payments = action.payload;
        },
        setSelectedpayments: (state, action) => {
            state.selectedpayments = action.payload;
        },
        
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase('clients/fetchClients/pending', (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase('clients/fetchClients/fulfilled', (state, action) => {
                state.isLoading = false;
                state.payments = action.payload.payments;
                state.paginationData = action.payload.paginationData;
            })
            .addCase('clients/fetchClients/rejected', (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },      
});




export const {
  setpayments,
  setSelectedpayments,
  setLoading,
  setError,
} = paymentsSlice.actions;   


/* export const selectClients = (state) => state.clients.clients;
export const selectSelectedClient = (state) => state.clients.selectedClient;
 */

export default paymentsSlice.reducer;