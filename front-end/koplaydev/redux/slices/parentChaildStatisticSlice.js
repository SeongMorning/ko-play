import { createSlice } from "@reduxjs/toolkit";

export const parentChaildStatisticSlice = createSlice({
    name: "parentChaildStatistic",
    initialState: null,
    reducers: {
        changeParentChaildStatistic: (state, action) => {
                return action.payload;
        }
    },
});

export const { changeParentChaildStatistic} = parentChaildStatisticSlice.actions;

export default parentChaildStatisticSlice;