import { ReducerType } from "@/redux/store";
import { Dispatch, PayloadAction, ThunkDispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Props {
    countLoader: number
}

const initialState: Props = {
    countLoader: 0
};

export const globalReducer = createSlice({
    name: "globalReducer",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<Props>) => ({ ...state, ...action.payload }),
        resetState: () => initialState
    },
});

export const startLoader = () => async (dispatch: ThunkDispatch<ReducerType, any, any>, getState: () => ReducerType) => {
    const globalReducerState = getState().globalReducer;
    const countLoader = globalReducerState.countLoader + 1;
    console.log('countLoader', countLoader);

    dispatch(updateState({
        countLoader
    }));
};

export const stopLoader = () => async (dispatch: ThunkDispatch<ReducerType, any, any>, getState: () => ReducerType) => {
    const globalReducerState = getState().globalReducer;
    const countLoader = globalReducerState.countLoader > 0 ? globalReducerState.countLoader - 1 : 0;
    dispatch(updateState({
        countLoader
    }));
};


export const {
    updateState,
    resetState
} = globalReducer.actions;

export default globalReducer.reducer;
