import { SIGN_UP_ERROR, SIGN_UP_SUCCESS } from "./actionType";
import axios from "axios";

export function signUp(requestBody) {
  const requestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const url =
    "http://digilib-env-1.eba-fphgpw6n.ap-south-1.elasticbeanstalk.com:5000/user/signup";
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
