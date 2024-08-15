import { createSlice } from "@reduxjs/toolkit";

export const currentAvatar = createSlice({
    name : "currentAvatar",
    initialState : "",
    reducers: {
        changeCurrentAvatar(state, action){
            return action.payload;
        }
    },
})

export let {changeCurrentAvatar} = currentAvatar.actions;

export default currentAvatar;