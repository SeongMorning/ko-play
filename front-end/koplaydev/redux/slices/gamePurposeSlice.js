import { createSlice } from "@reduxjs/toolkit";

export const gamePurpose = createSlice({
  name: "gamePurpose",
  initialState: 0,
  reducers: {
    changeGamePurposeIdx(state, idx) {
      return idx.payload;
    },
  },
});

export let { changeGamePurposeIdx } = gamePurpose.actions;

export default gamePurpose;
