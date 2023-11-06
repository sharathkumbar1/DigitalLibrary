import { SIGN_UP_ERROR, SIGN_UP_SUCCESS } from "./actionType";
import axios from "axios";
import { url as mainURL } from "../../config/apiCalls";

export function signUp(requestBody) {
  const requestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const url =
  mainURL+"user/signup";
  return (dispatch) => {
    let apiUrl = url;

    return axios
      .post(apiUrl, requestBody, requestConfig)
      .then((response) => {
        dispatch(handleSignUpSuccess(response));
      })
      .catch((error) => {
        dispatch(handleSignUpError(error));
      });
  };
}

export function handleSignUpError(record) {
  return {
    type: SIGN_UP_ERROR,
    record,
  };
}

export function handleSignUpSuccess(record) {
  return {
    type: SIGN_UP_SUCCESS,
    record,
  };
}
