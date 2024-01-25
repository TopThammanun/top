import { combineReducers } from "redux";
import loaderState from "@/store/app/loader"

const rootReducer = combineReducers({
  loaderState: loaderState
});
export default rootReducer;
