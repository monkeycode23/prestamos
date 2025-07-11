
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen:false,  
    modalName:"DEFAULT" ,
    open:"DEFAULT"
                
}




const modalSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {

        changeName:(state,action)=>{

           
            state.modalName  = action.payload
        },
        
        openModal:(state,action)=>{
            state.modalName = action.payload
            state.isOpen = true
        },
         closeModal:(state)=>{

            state.isOpen = false
        },
        toggleModal:(state)=>{

            state.isOpen = !state.isOpen
        }
       
    },
})

    export const { openModal,closeModal,toggleModal,changeName } = modalSlice.actions;
    export default modalSlice.reducer;