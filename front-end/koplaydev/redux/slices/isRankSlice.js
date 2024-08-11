import { createSlice } from "@reduxjs/toolkit";

export const isRank = createSlice({
    name : "incorrisRankect",
    initialState : false,
    reducers: {
        changeIsRank(state, action){
            return action.payload;
        }
    },
})

export let {changeIsRank} = isRank.actions;

export default isRank;