import { createSlice } from "@reduxjs/toolkit";

export const loading = createSlice({
    name : "loading",
    initialState : -1,
    reducers: {
        changeLoadingIdx(state, idx){
            return idx.payload;
        }
    },
})

export let {changeLoadingIdx} = loading.actions;

export default loading;