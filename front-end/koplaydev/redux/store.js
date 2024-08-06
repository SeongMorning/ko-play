import { combineReducers } from '@reduxjs/toolkit';
import modal from './slices/modalSlice';
import test from './slices/testSlice';
import myPage from './slices/myPageSlice';
import loading from './slices/loadingSlice';
import token from './slices/tokenSlice';
import correct from './slices/correct';
import studentInfo from './slices/studentInfoSlice';
import wrong from './slices/wrongList';
import incorrect from './slices/Incorrect';
import avatarSlice from './slices/avatarSlice';
import studentAvatarSlice from './slices/studentAvatarSlice';
import level from './slices/levelSlice';
import graphLevel from './slices/graphLevel';
import exp from "./slices/expSlice";
import gameWord from './slices/gameWordSlice';
import gamePurpose from './slices/gamePurposeSlice';
import game from './slices/gameSlice';
import parentChilds from './slices/parentChaildsSlice'

const rootReducer = combineReducers({
  modal: modal.reducer,
  test: test.reducer,
  myPage: myPage.reducer,
  level: level.reducer,
  loading: loading.reducer,
  token: token.reducer,
  correct: correct.reducer,
  studentInfo: studentInfo.reducer,
  wrong: wrong.reducer,
  incorrect: incorrect.reducer,
  avatar: avatarSlice.reducer,
  myAvatar: studentAvatarSlice.reducer,
  graphLevel: graphLevel.reducer,
  exp : exp.reducer,
  gameWord : gameWord.reducer,
  gamePurpose : gamePurpose.reducer,
  game : game.reducer,
  parentChilds: parentChilds.reducer,
});

export default rootReducer;