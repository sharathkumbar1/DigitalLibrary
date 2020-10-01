import { combineReducers } from "redux";
import signUpReducer from "./signup/reducer";
import signInReducer from "./signin/reducer";

const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
});

export default rootReducer;
