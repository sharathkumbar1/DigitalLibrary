import { FORGOT_PW_ERROR, FORGOT_PW_SUCCESS } from "./actionType";

export const initialState = {
    data: null,
    getError: null,
    forgotPwPostResponse: null,
    forgotPwPostErrResponse: null,
};

export default function forgotPwReducer(state = initialState, action = {}) {
    switch (action.type) {
        case FORGOT_PW_ERROR: {
            const { record } = action;
            return {
                ...state,
                forgotPwPostErrResponse: record?.response
                    ? record.response.data.errorMessage
                    : record,
                forgotPwPostResponse: null,
            };
        }
        case FORGOT_PW_SUCCESS: {
            const { record } = action;
            return {
                ...state,
                forgotPwPostResponse: record?.data?.message,
                forgotPwPostErrResponse: null,
            };
        }
        default:
            return state;
    }
}
