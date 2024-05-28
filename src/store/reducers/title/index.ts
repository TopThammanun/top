import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Props = {
    title: string
}

const initialState: Props = {
    title: "Untitled"
};

const titleSlice = createSlice({
    name: "titleSlice",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<Props>) => ({ ...state, ...action.payload }),
        resetState: () => initialState,
    },
});

export const titleAction = titleSlice.actions;
export const titleReducer = titleSlice.reducer;

