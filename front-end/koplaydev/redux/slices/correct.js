import { createSlice } from "@reduxjs/toolkit";

export const correct = createSlice({
    name : "correct",
    initialState : 0,
    reducers: {
        changeCorrectIdx(state, action){
            return action.payload;
        }
    },
})

export let {changeCorrectIdx} = correct.actions;

export default correct;