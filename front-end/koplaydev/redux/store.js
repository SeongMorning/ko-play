import { configureStore } from "@reduxjs/toolkit";
import modal from "./slices/modalSlice";
import game from "./slices/gameSlice";

export const store = configureStore({
    reducer : {
        modal : modal.reducer,
        game : game.reducer
    },
});