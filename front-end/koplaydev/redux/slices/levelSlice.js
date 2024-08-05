import { createSlice } from "@reduxjs/toolkit";

export const level = createSlice({
  name: "level",
  initialState: [0, 0, 0],
  reducers: {
    changeSpeechLevel(state, action) {
      state[0] = action.payload;
    },
    changeReadLevel(state, action) {
      state[1] = action.payload;
    },
    changeListenLevel(state, action) {
      state[2] = action.payload;
    },
  },
});

export let { changeSpeechLevel, changeReadLevel, changeListenLevel } =
  level.actions;

export default level;