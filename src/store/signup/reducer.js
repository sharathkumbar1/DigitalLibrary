import { SIGN_UP_ERROR, SIGN_UP_SUCCESS } from "./actionType";

export const initialState = {
  data: null,
  getError: null,
  signUpPostResponse: null,
  signUpPostErrResponse: null,
};

export default function signUpReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGN_UP_ERROR: {
      const { record } = action;

      // console.log(record.response.status)
      // console.log(record.response.data)
      // console.log(record.response.data.errorMessage)
      return {
        ...state,
        signUpPostErrResponse: record.response
          ? record.response.data.errorMessage
          : record,
        signUpPostResponse: null,
      };
    }
    case SIGN_UP_SUCCESS: {
      const { record } = action;
      return {
        ...state,
        signUpPostResponse: record.data,
        signUpPostErrResponse: null,
      };
    }
    default:
      return state;
  }
}
