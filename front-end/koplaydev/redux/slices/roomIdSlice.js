import { createSlice } from "@reduxjs/toolkit";

export const roomId = createSlice({
    name : "roomId",
    initialState : 0,
    reducers: {
        changeroomId(state, idx){
            return idx.payload;
        }
    },
})

export let {changeroomId} = roomId.actions;

export default roomId;