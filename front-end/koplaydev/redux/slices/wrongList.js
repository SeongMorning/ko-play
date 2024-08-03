import { createSlice } from "@reduxjs/toolkit";

export const wrong = createSlice({
    name : "wrong",
    initialState : [],
    reducers: {
        changeWrong(state, action){
            return action.payload;
        }
    },
})

export let {changeWrong} = wrong.actions;

export default wrong;