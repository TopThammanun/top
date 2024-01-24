import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Props {
    countLoadingAPI?: number
    isLoadingScreen?: boolean
}

const initialState: Props = {
    countLoadingAPI : 0,
    isLoadingScreen : false
};

export const loadingScreenReducer = createSlice({
    name: "loadingScreenReducer",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<Props>) => ({ ...state, ...action.payload }),
        resetState: () => initialState
    },
});

export const {
    updateState,
    resetState
} = loadingScreenReducer.actions;

export default loadingScreenReducer.reducer;
