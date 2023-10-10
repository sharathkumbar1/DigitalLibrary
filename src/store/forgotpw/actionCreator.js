import { FORGOT_PW_SUCCESS, FORGOT_PW_ERROR } from "./actionType";
import axios from "axios";

export function forgotPw(requestBody) {
  const requestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const url = "http://digilib-env-1.eba-fphgpw6n.ap-south-1.elasticbeanstalk.com:5000/user/password/forgot";
  return (dispatch) => {
    let apiUrl = url;

    return axios
      .post(apiUrl, requestBody, requestConfig)
      .then((response) => {
        console.log(response);
        dispatch(handleForgotPwSuccess(response));
      })
      .catch((response) => {
        console.log(response);
        dispatch(handleForgotPwError(response));
      });
  };
}

export function handleForgotPwError(record) {
  return {
    type: FORGOT_PW_ERROR,
    record,
  };
}

export function handleForgotPwSuccess(record) {
  return {
    type: FORGOT_PW_SUCCESS,
    record,
  };
}
