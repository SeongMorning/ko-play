import { createSlice } from "@reduxjs/toolkit";

export const graphLevel = createSlice({
    name : "graphLevel",
    initialState : 1,
    reducers: {
        changeGraphLevel(state, action){
            return action.payload;
        }
    },
})

export let {changeGraphLevel} = graphLevel.actions;

export default graphLevel;