import { SET_BACK_TO_COMPONENT } from './actionType'

export const initialState = {
  backToComponent: null,
}

export default function headerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BACK_TO_COMPONENT: {
      const { backToComponent } = action
      return {
        ...state,
        backToComponent: backToComponent,
      }
    }
    default:
      return state
  }
}
