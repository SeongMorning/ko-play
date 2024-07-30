import { createSlice } from "@reduxjs/toolkit";

export const test = createSlice({
    name : "test",
    initialState : 0,
    reducers: {
        changeNum(state, idx){
            return idx.payload;
        }
    },
})

export let {changeNum} = test.actions;

export default test;