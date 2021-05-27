import { SET_PDF_URL } from './actionType'

const initialState = {
    pdfUrl: "../../data/pdf/sample1.pdf",
}

export default function personalDevelopmentReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PDF_URL: {
      return { ...state, pdfUrl: action.pdfUrl }
    }
    default:
      return state
  }
}
