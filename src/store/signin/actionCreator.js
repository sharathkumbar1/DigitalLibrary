import { SIGN_IN_ERROR, SIGN_IN_SUCCESS } from "./actionType";
import axios from "axios";
import jwt from "jwt-decode";
import apiConfig from '../../config/apiConfig'

export function signIn(requestBody) {
    const requestConfig = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    const url = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/user/login";
    return (dispatch) => {
        let apiUrl = url; //`${apiConfig.signin.url}`;

        return axios
            .post(apiUrl, requestBody, requestConfig)
            .then((response) => {
                const token = response.data.token;
                const user = jwt(token); // decode your token here
                console.log(user)
                localStorage.setItem('token', token);
                dispatch(handleSignInSuccess(response));
            })
            .catch((response) => {
                dispatch(handleSignInError(response));
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
