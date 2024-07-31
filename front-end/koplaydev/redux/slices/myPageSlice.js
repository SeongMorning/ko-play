import { createSlice } from "@reduxjs/toolkit";

export const myPage = createSlice({
    name : "myPage",
    initialState : 1,
    reducers: {
        changeMyPageIdx(state, idx){
            return idx.payload;
        }
    },
})

export let {changeMyPageIdx} = myPage.actions;

export default myPage;