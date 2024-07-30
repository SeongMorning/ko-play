import { createSlice } from "@reduxjs/toolkit";

export const modal = createSlice({
    name : "modal",
    initialState : 0,
    reducers: {
        changeModalIdx(state, idx){
            return idx.payload;
        }
    },
})

export let {changeModalIdx} = modal.actions;

export default modal;