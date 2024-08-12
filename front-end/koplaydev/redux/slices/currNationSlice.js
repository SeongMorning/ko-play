import { createSlice } from "@reduxjs/toolkit";

export const currNation = createSlice({
    name : "currNation",
    initialState : "vi_VN",
    reducers: {
        changeCurrNation(state, action){
            return action.payload;
        }
    },
})

export let {changeCurrNation} = currNation.actions;

export default currNation;