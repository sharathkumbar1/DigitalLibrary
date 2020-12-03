import { combineReducers } from "redux";
import signUpReducer from "./signup/reducer";
import signInReducer from "./signin/reducer";
import forgotPwReducer from "./forgotpw/reducer";
import notification from './notification/reducer'
import headerReducer from './header/reducer';
import personalDevelopment from './personalDevelopment/reducer';
import updatePwReducer from "./updatepw/reducer";

const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  forgotPwReducer,
  notification,
  headerReducer,
  personalDevelopment,
  updatePwReducer,
});

export default rootReducer;
