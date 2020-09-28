import { combineReducers } from "redux";
import signUpReducer from "./signup/reducer";

const rootReducer = combineReducers({
  signUpReducer,
});

export default rootReducer;
