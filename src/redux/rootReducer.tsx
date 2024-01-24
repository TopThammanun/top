import { combineReducers } from "redux";
import globalReducer from "./reducers/globalReducer"

const rootReducer = combineReducers({
  globalReducer: globalReducer
});
export default rootReducer;
