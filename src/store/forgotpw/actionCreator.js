import { FORGOT_PW_SUCCESS, FORGOT_PW_ERROR } from "./actionType";
import axios from "axios";
import apiConfig from '../../config/apiConfig'

export function forgotPw(requestBody) {
    const requestConfig = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    const url = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/password/forgot";
    return (dispatch) => {
        let apiUrl = url; //`${apiConfig.forgotpw.url}`;

        return axios
            .post(apiUrl, requestBody, requestConfig)
            .then((response) => {
                dispatch(handleForgotPwSuccess(response));
            })
            .catch((response) => {
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
