import { SET_PDF_URL, SET_PDF_ISBN } from './actionType'

const initialState = {
    pdfUrl: "../../data/pdf/sample1.pdf",
    pdfIsbn: "",
}

export default function personalDevelopmentReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PDF_URL: {
      return { ...state, pdfUrl: action.pdfUrl }
    }
    case SET_PDF_ISBN: {
      return { ...state, pdfIsbn: action.pdfIsbn }
    }
    default:
      return state
  }
}
