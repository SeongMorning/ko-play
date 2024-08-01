import { createSlice } from "@reduxjs/toolkit";

export const graphLevel = createSlice({
    name : "graghLevel",
    initialState : 1,
    reducers: {
        changeGraphLevelIdx(state, idx){
            return idx.payload;
        }
    },
})

export let {changeGraphLevelIdx} = graphLevel.actions;

export default graphLevel;