import { createSlice } from "@reduxjs/toolkit";

export const wordRain = createSlice({
  name: "wordRain",
  initialState: {
    gameIdx: 1,
    correct: 0,
    totalQuestion: 10,
    gameLevel: 0,
    gainedExp: 0,
  },
  reducers: {
    changeWordRainInfo(state, action) {
      return action.payload;
    },
    changeWordRainCorrect(state, action) {
      state.correct = action.payload;
    },
    changeWordRainGameLevel(state, action) {
      state.gameLevel = action.payload;
    },
    changeWordRainGainedExp(state, action) {
      state.gainedExp = action.payload;
    },
  },
});

export let {
  changeWordRainInfo,
  changeWordRainCorrect,
  changeWordRainGameLevel,
  changeWordRainGainedExp,
} = game.actions;

export default wordRain;
