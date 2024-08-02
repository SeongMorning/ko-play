import { createSlice } from "@reduxjs/toolkit";

export const token = createSlice({
    name : "token",
    initialState : 1,
    reducers: {
        changeTokenIdx(state, idx){
            return idx.payload;
        }
    },
})

export let {changeTokenIdx} = token.actions;

export default token;