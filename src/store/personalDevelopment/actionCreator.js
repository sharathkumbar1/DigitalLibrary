import { SET_PDF_URL } from './actionType'

export function setPdfURL(pdfUrl) {
    return {
        type: SET_PDF_URL,
        pdfUrl,
    }
}