import { UPDATE_PW_ERROR, UPDATE_PW_SUCCESS } from "./actionType";

export const initialState = {
    data: null,
    getError: null,
    updatePwPostResponse: null,
    updatePwPostErrResponse: null,
};

export default function updatePwReducer(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_PW_ERROR: {
            const { record } = action;
            return {
                ...state,
                updatePwPostErrResponse: record ?
                    record.response
                        ? record.response.data.errorMessage
                        : record
                    : null,
                updatePwPostResponse: null,
            };
        }
        case UPDATE_PW_SUCCESS: {
            const { record } = action;
            return {
                ...state,
                updatePwPostResponse: record.data,
                updatePwPostErrResponse: null,
            };
        }
        default:
            return state;
    }
}
