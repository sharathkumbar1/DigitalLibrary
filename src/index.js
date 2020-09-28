import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from './store/configureStore'
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";

const store = configureStore();
const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  rootEl
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
