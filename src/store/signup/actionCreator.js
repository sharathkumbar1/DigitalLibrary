import { SIGN_UP_ERROR, SIGN_UP_SUCCESS } from "./actionType";
import axios from "axios";
import apiConfig from '../../config/apiConfig'

export function signUp(requestBody) {
  const requestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  //console.log(">>>>>>>> "+apiConfig.signup.url);

  const url = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/signup";
  return (dispatch) => {
    let apiUrl = url; //`${apiConfig.signup.url}`;

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
