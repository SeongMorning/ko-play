import { createSlice } from "@reduxjs/toolkit";

export const test = createSlice({
    name : "test",
    initialState : 1,
    reducers: {
        changeTestIdx(state, idx){
            return idx.payload;
        }
    },
})

export let {changeTestIdx} = test.actions;

export default test;