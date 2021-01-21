import { ACCOUNT_VF_ERROR, ACCOUNT_VF_SUCCESS } from "./actionType";

export const initialState = {
    data: null,
    getError: null,
    accountVfPostResponse: null,
    accountVfPostErrResponse: null,
};

export default function accountVfReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ACCOUNT_VF_ERROR: {
            const { record } = action;

            // console.log(record.response.status)
            // console.log(record.response.data)
            // console.log(record.response.data.errorMessage)
            return {
                ...state,
                accountVfPostErrResponse: record ?
                    record.response
                        ? record.response.data.errorMessage
                        : record
                    : null,
                accountVfPostResponse: null,
            };
        }
        case ACCOUNT_VF_SUCCESS: {
            const { record } = action;
            return {
                ...state,
                accountVfPostResponse: record.data,
                accountVfPostErrResponse: null,
            };
        }
        default:
            return state;
    }
}
