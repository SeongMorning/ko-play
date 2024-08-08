import { createSlice } from "@reduxjs/toolkit";

export const parentSlice = createSlice({
  name: "parent",
  initialState: {
    parentName: "",
    nationality: "",
    visited: "",
  },
  reducers: {
    changeParentInfo(state, action) {
      return action.payload;
    },
    setParentName(state, action) {
      state.id = action.payload;
    },
    setNationality(state, action) {
      state.pw = action.payload;
    },
    setVisited(state, action) {
      state.name = action.payload;
    },
  },
});

export const {
  changeParentInfo,
  setParentName,
  setNationality,
  setVisited,
} = parentSlice.actions;

export default parentSlice;
