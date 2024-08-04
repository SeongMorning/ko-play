import { createSlice } from "@reduxjs/toolkit";

export const avatarSlice = createSlice({
  name: "avatar",
  initialState: {
    avatars: [], // AvatarDTO 배열
  },
  reducers: {
    setAvatars(state, action) {
      state.avatars = action.payload; // 서버에서 받은 데이터를 상태에 저장
    },
    addAvatar(state, action) {
      state.avatars.push(action.payload); // 새로운 아바타 추가
    },
    updateAvatar(state, action) {
      const index = state.avatars.findIndex(avatar => avatar.avatarIdx === action.payload.avatarIdx);
      if (index !== -1) {
        state.avatars[index] = action.payload; // 아바타 업데이트
      }
    },
    removeAvatar(state, action) {
      state.avatars = state.avatars.filter(avatar => avatar.avatarIdx !== action.payload); // 아바타 삭제
    },
  },
});

// 액션 내보내기
export const { setAvatars, addAvatar, updateAvatar, removeAvatar } = avatarSlice.actions;

export default avatarSlice;