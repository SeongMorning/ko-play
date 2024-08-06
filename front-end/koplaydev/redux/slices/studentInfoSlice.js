import { createSlice } from "@reduxjs/toolkit";

export const studentInfo = createSlice({
  name: "studentInfo",
  initialState: {
    id: "",
    pw: "",
    name: "",
    nickname: "",
    profileImg: "",
    birth: "",
    schoolName: "",
    exp: "",
    speechLevel: "" ,
    listeningLevel: "" ,
    readingLevel: "" ,
    nation: "",
  },
  reducers: {
    changeStudentInfo(state, action) {
      return action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setPw(state, action) {
      state.pw = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setNickname(state, action) {
      state.nickname = action.payload;
    },
    setProfileImg(state, action) {
      state.profileImg = action.payload;
    },
    setBirth(state, action) {
      state.birth = action.payload;
    },
    setSchoolName(state, action) {
      state.schoolName = action.payload;
    },
    setExp(state, action) {
      state.exp = action.payload;
    },
    setNation(state, action) {
      state.nation = action.payload;
    },
  },
});

export const {
  changeStudentInfo,
  setId,
  setPw,
  setName,
  setNickname,
  setProfileImg,
  setBirth,
  setSchoolName,
  setExp,
  setNation,
} = studentInfo.actions;

export default studentInfo;
