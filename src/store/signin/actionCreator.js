import { SIGN_IN_ERROR, SIGN_IN_SUCCESS } from "./actionType";
import axios from "axios";
import jwt_decode from "jwt-decode";

export function signIn(requestBody) {
  const requestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const url =
    "http://digilib-env-1.eba-fphgpw6n.ap-south-1.elasticbeanstalk.com:5000/user/login";
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
