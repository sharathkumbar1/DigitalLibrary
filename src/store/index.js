import { combineReducers } from "redux";
import signUpReducer from "./signup/reducer";
import signInReducer from "./signin/reducer";
import forgotPwReducer from "./forgotpw/reducer";
import notification from './notification/reducer'
import headerReducer from './header/reducer';
import personalDevelopment from './personalDevelopment/reducer';
import updatePwReducer from "./updatepw/reducer";
import accountVfReducer from "./accountvf/reducer";
import searchReducer from "./search/reducer";

const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  forgotPwReducer,
  notification,
  headerReducer,
  personalDevelopment,
  updatePwReducer,
  accountVfReducer,
  searchReducer,
});

export default rootReducer;
