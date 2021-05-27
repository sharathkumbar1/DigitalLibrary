import { SET_PDF_URL, SET_PDF_ISBN } from './actionType'

export function setPdfURL(pdfUrl) {
    return {
        type: SET_PDF_URL,
        pdfUrl,
    }
}

export function setPdfISBN(pdfIsbn) {
    return {
        type: SET_PDF_ISBN,
        pdfIsbn,
    }
}