import { createSlice } from "@reduxjs/toolkit";

export const translationWords = createSlice({
    name : "translationWords",
    initialState : {},
    reducers: {
        changeTranslationWords(state, action){
            return action.payload;
        }
    },
})

export let {changeTranslationWords} = translationWords.actions;

export default translationWords;