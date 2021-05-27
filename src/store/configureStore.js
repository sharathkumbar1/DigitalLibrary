import { applyMiddleware, createStore } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./index";
import thunkMiddleware from "redux-thunk";

export const middleware = [];

if (process.env.NODE_ENV !== "production") {
  middleware.push(reduxImmutableStateInvariant());
}

middleware.push(thunkMiddleware);

export default function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
