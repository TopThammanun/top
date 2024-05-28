import { combineReducers } from "redux";
import { loaderReducer } from "./reducers/loader";
import { titleReducer } from "./reducers/title";

const rootReducer = combineReducers({
  loaderState: loaderReducer,
  titleState: titleReducer,
});
export default rootReducer;
