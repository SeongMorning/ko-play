import { createSlice } from "@reduxjs/toolkit";

export const exp = createSlice({
    name : "exp",
    initialState : 0,
    reducers: {
        changeExp(state, action){
            return action.payload;
        }
    },
})

export let {changeExp} = exp.actions;

export default exp;