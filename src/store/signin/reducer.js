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

            // console.log(record)
            return {
                ...state,
                signInPostErrResponse: record ?
                record.response
                  ? record.response.data.errorMessage
                  : record
                : null,
                signInPostResponse: null,
            };
        }
        case SIGN_IN_SUCCESS: {
            const { record } = action;

            // console.log(record)
            return {
                ...state,
                signInPostResponse: record,
                signInPostErrResponse: null,
            };
        }
        default:
            return state;
    }
}
