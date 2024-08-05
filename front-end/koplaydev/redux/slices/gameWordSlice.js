import { createSlice } from "@reduxjs/toolkit";

export const gameWord = createSlice({
    name : "gameWord",
    initialState : [],
    reducers: {
        changeGameWord(state, action){
            return action.payload;
        }
    },
})

export let {changeGameWord} = gameWord.actions;

export default gameWord;