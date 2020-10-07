import { combineReducers } from "redux";
import signUpReducer from "./signup/reducer";
import signInReducer from "./signin/reducer";
import forgotPwReducer from "./forgotpw/reducer";

const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  forgotPwReducer,
});

export default rootReducer;
