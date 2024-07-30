import { createSlice } from "@reduxjs/toolkit";

export const game = createSlice({
    name : "game",
    initialState : 0,
    reducers: {
        changeGameIdx(state, idx){
            return idx.payload;
        }
    },
})

export let {changeGameIdx} = game.actions;

export default game;