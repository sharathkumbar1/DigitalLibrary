import { SHOW_NOTIFICATION, SHOW_NOTIFICATION_ERROR, SHOW_NOTIFICATION_SUCCESS } from './actionType'

export const initialState = {
  isShown: false,
  message: '',
  isShownSuccess: false,
  messageSuccess: '',
  isShownError: false,
  messageError: '',
  inWhichPage: '',

}

export default function notificationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      const { payload } = action
      const { isShown, message } = payload
      return {
        ...state,
        isShown,
        message,
      }
    }
    case SHOW_NOTIFICATION_SUCCESS: {
      const { payload } = action
      const { isShownSuccess, messageSuccess } = payload
      return {
        ...state,
        isShownSuccess,
        messageSuccess,
      }
    }
    case SHOW_NOTIFICATION_ERROR: {
      const { payload } = action
      const { isShownError, messageError, inWhichPage } = payload
      return {
        ...state,
        isShownError,
        messageError,
        inWhichPage,
      }
    }
    default:
      return state
  }
}
