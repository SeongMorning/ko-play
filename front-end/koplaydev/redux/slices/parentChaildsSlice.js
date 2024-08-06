import { createSlice } from "@reduxjs/toolkit";
const colors = [
    "rgb(250, 201, 201)",
    "rgb(189, 224, 254)",
    "rgb(252, 246, 189)",
    "rgb(175, 224, 197)",
    "rgb(232, 208, 238)",
    "rgb(200, 252, 250)",
    "rgb(255, 229, 204)",
    "rgb(250, 241, 242)"
];
const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

export const parentChildsSlice = createSlice({
    name: "parentChilds",
    initialState: [{
        id: "",
        pw: "",
        profileImg: "",
        name: "", 
        birth: "",
        bgColor: colors[Math.floor(Math.random() * colors.length)]
    }],
    reducers: {
        changeParentChildsInfo: (state, action) => {
            return action.payload.map(profile => ({
                ...profile,
                bgColor: getRandomColor() 
            }));
        },
        addParentChild(state, action) {
            const newProfile = {
                ...action.payload,
                bgColor: getRandomColor()
            };
            state.push(newProfile);
        },
        removeChild(state, action) {
            const idToRemove = action.payload;
            return state.filter(profile => profile.id !== idToRemove);
        },
    },
});

export const { changeParentChildsInfo, addParentChild, removeChild } = parentChildsSlice.actions;

export default parentChildsSlice;