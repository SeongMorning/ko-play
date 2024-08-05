import { createSlice } from "@reduxjs/toolkit";

export const game = createSlice({
    name : "game",
    initialState : 0,
    reducers: {
        changeGameIdx(state, action){
            return action.payload;
        }
    },
})

export let {changeGameIdx} = game.actions;

export default game;