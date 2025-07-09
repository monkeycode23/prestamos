import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    page:1,
    currentPage:1,
    totalPages:5,
    limitPerPage:10,
    totalItems:0,
    filter:null
                
}


const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPage:(state,action)=>{

            state.page  = action.payload
        },
       setPaginationData:(state,action)=>{

            const {page,limitPerPage,totalItems} = action.payload
            state.page=action.payload.page
           // state.currentPage=action.payload.page
            state.limitPerPage=LimitPerPage
            state.totalItems = totalItems
            state.totalPages = totalItems>limitPerPage ? Math.ceil(limitPerPage/totalItems):1
        },
        resetPaginationData:(state)=>{
            state.page=1
            state.currentPage=1
            state. totalPages=1
            state.limitPerPage=10
        },
        setFilter:(state,action)=>{
            state.filter = action.payload
        },
        resetFilter:(state,action)=>{
            state.filter = null
        },


    },
})



    export const { setPage,setPaginationData,setFilter,resetFilter,resetPaginationData } = paginationSlice.actions;
export default  paginationSlice.reducer;