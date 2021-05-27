import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MobilePDFReader } from "reactjs-pdf-reader";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import { IconButton } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import axios from "axios";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    grow: {
        flexGrow: 1,
        padding: '6px 10px 6px 10px',
    },
    grow1: {
        flexGrow: 1,
        padding: '6px 190px 6px 10px',
    },
    
}));


const PDFViewer = () => {
    
    const userdata = useSelector(state => state.signInReducer);
    let currentUserId = userdata.signInPostResponse.userSequenceId;
    console.log(" user id ", currentUserId)
    
    const pdfUrl = useSelector(state => state.personalDevelopment.pdfUrl)
    const [pdfPath, sePdfPath] = useState(pdfUrl)

    const pdfIsbn = useSelector(state => state.personalDevelopment.pdfIsbn)
    //const [pdfIsbn, sePdfPath] = useState(pdfIsbn)

    console.log("iiissss ", pdfIsbn)

    const classes = useStyles();
    const requestConfig = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    const bookUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/search?bookType=Audio_Book&book_name="
    let apiUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/bookmarked_books";
    

    useEffect(() => {
        sePdfPath(pdfUrl)
    }, [pdfUrl])
    console.log("pdf url " + pdfUrl)

    useEffect(() => {
        let requestBody = {
           
            "current_page": 0,
            "isbn": pdfIsbn,
            "user_id": currentUserId
        }

        let recentlyViewedBookUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/recently_viewed_books"

        return axios
            .post(recentlyViewedBookUrl, requestBody, requestConfig)
            .then((response) => {
                console.log(response);
                

            })
            .catch((response) => {
                console.log(response);
            });
    
      }, [])

    const saveBook = (isbn, aa, bb) => {
        console.log("saving .... " + isbn)
        // console.log("current page ", MobilePDFReader.current_page)
        // console.log("current page111 ", MobilePDFReader.getPageNumber)
        console.log("aa  ", aa)
        console.log("bb ", bb)

        let requestBody = {
            "isbn": isbn,
            "user_id": currentUserId
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

    const recentlyViewedBook = (isbn) => {
        console.log("recentlyViewedBook .... " + isbn)

        const requestConfig = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        let requestBody = {
            "isbn": isbn,
            "user_id": currentUserId
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

    recentlyViewedBook(pdfIsbn);


    return (
     
            <React.Fragment>
                <CssBaseline />
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                        <IconButton aria-label="delete">
                            <a href={pdfUrl} download={pdfUrl} target="_blank" style={{color:'#fff'}}><CloudDownloadOutlinedIcon /></a>
                            
                        </IconButton>
                        <div className={classes.grow} />
                        <SaveIcon  onClick={() => saveBook(pdfIsbn, MobilePDFReader.current_page, MobilePDFReader.getPageNumber)} />
                        <div className={classes.grow1} />

                    </Toolbar>
                </AppBar> 
                
                    <MobilePDFReader url={pdfPath} />
                
            </React.Fragment>
       
    )
}

export default PDFViewer