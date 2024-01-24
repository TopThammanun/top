import { combineReducers } from "redux";
import loadingScreenReducer from "./reducers/loadingScreenReducer"

const rootReducer = combineReducers({
  loadingScreenReducer: loadingScreenReducer
});
export default rootReducer;
