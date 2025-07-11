

import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    
    selectedItems:[]
}


const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        addItem:(state,action)=>{

            state.selectedItems.push(action.payload)
        },
        removeItem:(state,action)=>{

            state.selectedItems.filter((item)=>action.payload.cb(item))
        }

    },
})



    export const {  addItem,removeItem   } = selectionSlice.actions;
export default  selectionSlice.reducer;