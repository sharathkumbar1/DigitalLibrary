import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MobilePDFReader } from "reactjs-pdf-reader";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import { IconButton } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import axios from "axios";

const useStyles = theme => ({
    save: {
        width: "48px",
        display: "inline",
        height: "48px",
        paddingLeft: "20px",
        fill: "#00000090",
        "&:active": {
            fill: "black",
            cursor: "pointer",
        }
    },
})


const PDFViewer = () => {
    const pdfUrl = useSelector(state => state.personalDevelopment.pdfUrl)
    const [pdfPath, sePdfPath] = useState(pdfUrl)
    const classes = useStyles();

    const bookUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/search?bookType=Audio_Book&book_name="
    let apiUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/bookmarked_books";


    const saveBook = (isbn) => {
        console.log("saving .... "+isbn)

        const requestConfig = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        
        let requestBody = {
            "isbn": isbn,
            "user_id": 33
        }

        return axios
            .post(apiUrl, requestBody, requestConfig)
            .then((response) => {
                console.log(response);
               // console.log(JSON.parse(response.data));
                console.log(response.data.message);

                
            })
            .catch((response) => {
                console.log(response);
            });
    }

    useEffect(() => {
        sePdfPath(pdfUrl)
    }, [pdfUrl])
    console.log("pdf url " + pdfUrl)


    return (
        <div  >
            
            <div  >
                <IconButton aria-label="delete">
                    <a href={pdfUrl} download={pdfUrl} target="_blank"><CloudDownloadOutlinedIcon /></a>
                </IconButton>
                <div>
                <SaveIcon className={classes.save} onClick={() => saveBook(126)} />
                </div>
                <Divider variant="middle" />
            </div>
            <div>
                <MobilePDFReader style={{ paddingTop: '180px' }}url={pdfPath} />
            </div>
           
        </div>
    )
}

export default PDFViewer