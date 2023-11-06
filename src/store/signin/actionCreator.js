import { SIGN_IN_ERROR, SIGN_IN_SUCCESS } from "./actionType";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { url as mainURL} from "../../config/apiCalls";

export function signIn(requestBody) {
  const requestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const url =
  mainURL+"user/login";
  return (dispatch) => {
    let apiUrl = url;

    return axios
      .post(apiUrl, requestBody, requestConfig)
      .then((response) => {
        let token = response.data.token;
        localStorage.setItem("token", token);

        let user = jwt_decode(token); // decode your token here
        dispatch(handleSignInSuccess(JSON.parse(user.payload)));
      })
      .catch((error) => {
        dispatch(handleSignInError(error));
      });
  };
}

export function handleSignInError(record) {
  return {
    type: SIGN_IN_ERROR,
    record,
  };
}

export function handleSignInSuccess(record) {
  return {
    type: SIGN_IN_SUCCESS,
    record,
  };
}
