import { createSlice } from "@reduxjs/toolkit";

export const hints = createSlice({
  name: "hints",
  initialState: { hints: [], chosenWords: [] },
  reducers: {
    changeHints(state, action) {
      return {
        hints: action.payload.hints,
        chosenWords: action.payload.chosenWords,
      };
    },
  },
});

export let { changeHints } = hints.actions;

export default hints;
