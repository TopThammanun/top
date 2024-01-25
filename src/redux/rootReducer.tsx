import { combineReducers } from "redux";
import globalReducer from "./reducers/global"

const rootReducer = combineReducers({
  globalReducer: globalReducer
});
export default rootReducer;
