import { createSlice } from "@reduxjs/toolkit";

export const gameLeft = createSlice({
    name : "gameLeft",
    initialState : [],
    reducers: {
        changegameLeft(state, action){
            return action.payload;
        }
    },
})

export let {changegameLeft} = gameLeft.actions;

export default gameLeft;