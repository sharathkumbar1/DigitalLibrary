import { SET_BACK_TO_COMPONENT } from './actionType'

export function setBackToComponent(backToComponent) {
  return {
    type: SET_BACK_TO_COMPONENT,
    backToComponent: backToComponent,
  }
}