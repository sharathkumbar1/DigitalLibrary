import { SHOW_NOTIFICATION, SHOW_NOTIFICATION_ERROR, SHOW_NOTIFICATION_SUCCESS } from './actionType'

export function showNotification(isShown, message) {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      isShown,
      message,
    },
  }
}

export function showNotificationSuccess(isShownSuccess, messageSuccess) {
  return {
    type: SHOW_NOTIFICATION_SUCCESS,
    payload: {
      isShownSuccess,
      messageSuccess,
    },
  }
}

export function showNotificationError(isShownError, messageError, inWhichPage) {
  return {
    type: SHOW_NOTIFICATION_ERROR,
    payload: {
      isShownError,
      messageError,
      inWhichPage,
    },
  }
}
