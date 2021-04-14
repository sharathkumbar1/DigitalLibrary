import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MobilePDFReader } from "reactjs-pdf-reader";

const PDFViewer = () => {
    const pdfUrl = useSelector(state => state.personalDevelopment.pdfUrl)
    const [pdfPath, sePdfPath] = useState(pdfUrl)

    useEffect(() => {
        sePdfPath(pdfUrl)
      }, [pdfUrl])
console.log("pdf url "+pdfUrl)
    return(
        <MobilePDFReader url={pdfPath} />
    )
}

export default PDFViewer