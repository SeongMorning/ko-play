import { createSlice } from "@reduxjs/toolkit";

export const incorrect = createSlice({
    name : "incorrect",
    initialState : null,
    reducers: {
        changeInCorrect(state, action){
            return action.payload;
        }
    },
})

export let {changeInCorrect} = incorrect.actions;

export default incorrect;