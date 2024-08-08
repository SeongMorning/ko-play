import { createSlice } from "@reduxjs/toolkit";

export const hints = createSlice({
  name: "hints",
  initialState: { hints: [], chosenWords: [], audioHints: [] },
  reducers: {
    changeHints(state, action) {
      return {
        hints: action.payload.hints,
        chosenWords: action.payload.chosenWords,
        audioHints: action.payload.audioHints,
      };
    },
  },
});

export let { changeHints } = hints.actions;

export default hints;
