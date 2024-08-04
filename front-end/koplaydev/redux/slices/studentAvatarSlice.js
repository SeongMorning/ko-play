import { createSlice } from "@reduxjs/toolkit";

export const studentAvatarSlice = createSlice({
  name: "studentAvatar",
  initialState: {
    avatars: [], // StudentUsableAvatarDTO 배열
  },
  reducers: {
    setStudentAvatars(state, action) {
      state.avatars = action.payload; // 서버에서 받은 데이터를 상태에 저장
    },
    addAvatar(state, action) {
      state.avatars.push(action.payload); // 새로운 아바타 추가
    },
    updateAvatar(state, action) {
      const index = state.avatars.findIndex(avatar => avatar.studentUsableAvatarIdx === action.payload.studentUsableAvatarIdx);
      if (index !== -1) {
        state.avatars[index] = action.payload; // 아바타 업데이트
      }
    },
  },
});

// 액션 내보내기
export const { setAvatars, addAvatar, updateAvatar } = studentAvatarSlice.actions;

export default studentAvatarSlice;