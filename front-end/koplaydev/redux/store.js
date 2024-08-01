import { configureStore } from "@reduxjs/toolkit";
import modal from "./slices/modalSlice";
import game from "./slices/gameSlice";
import test from "./slices/testSlice";
import myPage from "./slices/myPageSlice";
import graphLevel from "./slices/graphLevelSlice";

export const store = configureStore({
    reducer : {
        modal : modal.reducer,
        game : game.reducer,
        test : test.reducer,
        myPage : myPage.reducer,
        graphLevel : graphLevel.reducer,
    },
});