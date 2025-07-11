
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  clients: [], 
  client:{}, 
    selectedClient: null,
    paginationData: {   
        page: 1,
        totalItems: 0,
        limit: 10,
        },  
    isLoading: false,
    error: null,    
};  



const clientsSlice = createSlice({
  name: 'clients',    
    initialState,   
    reducers: { 

        setClient: (state, action) => {
            state.client=action.payload;
        },
        addClient: (state, action) => {
            state.clients.unshift(action.payload);
        },
        updateClient: (state, action) => { 
            const index = state.clients.findIndex(client => client.id === action.payload.id);
            if (index !== -1) {
                state.clients[index] = action.payload;
            }       
        },
        deleteClient: (state, action) => {
            state.clients = state.clients.filter(client => client.id !== action.payload);
        },
        setClients: (state, action) => {
            state.clients = action.payload;
        },
        setSelectedClient: (state, action) => {
            state.selectedClient = action.payload;
        },
        setPaginationData: (state, action) => {
            state.paginationData = action.payload;
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
                state.clients = action.payload.clients;
                state.paginationData = action.payload.paginationData;
            })
            .addCase('clients/fetchClients/rejected', (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },      
});




export const {
  setClients,
  setSelectedClient,
  setPaginationData,
  setLoading,
  setError,
addClient,
setClient,
} = clientsSlice.actions;   


export const selectClients = (state) => state.clients.clients;
export const selectSelectedClient = (state) => state.clients.selectedClient;



export default clientsSlice.reducer;