import { combineReducers } from "redux";
import loaderSlice from "@/store/app/loader/loader"

const rootReducer = combineReducers({
  globalState: loaderSlice
});
export default rootReducer;
