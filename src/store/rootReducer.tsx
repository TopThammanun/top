import { combineReducers } from "redux";
import { loaderReducer } from "./reducers/loader";

const rootReducer = combineReducers({
  loaderState: loaderReducer
});
export default rootReducer;
