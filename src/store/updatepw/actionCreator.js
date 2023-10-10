import { UPDATE_PW_ERROR, UPDATE_PW_SUCCESS } from "./actionType";
import axios from "axios";

export function updatePw(requestBody, requestConfigToken) {
  const requestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Token: "test",
    },
  };

  const url =
    "http://digilib-env-1.eba-fphgpw6n.ap-south-1.elasticbeanstalk.com:5000/user/password/update";
  return (dispatch) => {
    let apiUrl = url;

    return axios
      .post(apiUrl, requestBody, requestConfigToken)
      .then((response) => {
        dispatch(handleUpdatePwSuccess(response));
      })
      .catch((error) => {
        dispatch(handleUpdatePwError(error));
      });
  };
}

export function handleUpdatePwError(record) {
  return {
    type: UPDATE_PW_ERROR,
    record,
  };
}

export function handleUpdatePwSuccess(record) {
  return {
    type: UPDATE_PW_SUCCESS,
    record,
  };
}
