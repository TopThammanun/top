import { ReducerType } from "@/redux/store";
import { Dispatch, PayloadAction, ThunkDispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Props {
    loader: number
}

const initialState: Props = {
    loader: 0
};

export const globalReducer = createSlice({
    name: "globalReducer",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<Props>) => ({ ...state, ...action.payload }),
        resetState: () => initialState,
        startLoader: (state) => ({ ...state, loader: state.loader + 1 }),
        stopLoader: (state) => ({ ...state, loader: state.loader > 0 ? state.loader - 1 : 0 })
    },
});

// export const startLoader = () => async (dispatch: ThunkDispatch<ReducerType, any, any>, getState: () => ReducerType) => {
//     const globalReducerState = getState().globalReducer;
//     const loader = globalReducerState.loader + 1;
//     console.log('loader', loader);

//     dispatch(updateState({
//         loader
//     }));
// };

// export const stopLoader = () => async (dispatch: ThunkDispatch<ReducerType, any, any>, getState: () => ReducerType) => {
//     const globalReducerState = getState().globalReducer;
//     const loader = globalReducerState.loader > 0 ? globalReducerState.loader - 1 : 0;
//     dispatch(updateState({
//         loader
//     }));
// };


export const {
    updateState,
    resetState,
    startLoader,
    stopLoader
} = globalReducer.actions;

export default globalReducer.reducer;
