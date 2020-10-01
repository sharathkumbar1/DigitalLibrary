import { SIGN_IN_ERROR, SIGN_IN_SUCCESS } from "./actionType";

export const initialState = {
    data: null,
    getError: null,
    signInPostResponse: null,
    signInPostErrResponse: null,
};

export default function signInReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SIGN_IN_ERROR: {
            const { record } = action;
            return {
                ...state,
                signInPostErrResponse: record.response
                    ? record.response.message
                    : record,
                signInPostResponse: null,
            };
        }
        case SIGN_IN_SUCCESS: {
            const { record } = action;
            return {
                ...state,
                signInPostResponse: record.data,
                signInPostErrResponse: null,
            };
        }
        default:
            return state;
    }
}
