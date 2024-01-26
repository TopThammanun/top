import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Props = {
    loader: number
}

const initialState: Props = {
    loader: 0
};

const loaderSlice = createSlice({
    name: "loaderSlice",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<Props>) => ({ ...state, ...action.payload }),
        resetState: () => initialState,
        startLoader: (state) => ({ ...state, loader: state.loader + 1 }),
        stopLoader: (state) => ({ ...state, loader: state.loader > 0 ? state.loader - 1 : 0 })
    },
});

export const loaderAction = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;

