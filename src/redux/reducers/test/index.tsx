import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text: "Hello Test"
};

export const test = createSlice({
    name: "test",
    initialState,
    reducers: {
        updateState: (state, action) => ({ ...state, ...action.payload }),
        resetState: () => initialState
    },
});

export const {
    updateState,
    resetState
} = test.actions;

export default test.reducer;
