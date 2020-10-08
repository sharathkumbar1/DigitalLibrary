import { combineReducers } from "redux";
import signUpReducer from "./signup/reducer";
import signInReducer from "./signin/reducer";
import forgotPwReducer from "./forgotpw/reducer";
import notification from './notification/reducer'

const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  forgotPwReducer,
  notification
});

export default rootReducer;
