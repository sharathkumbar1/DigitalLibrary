import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MobilePDFReader } from "reactjs-pdf-reader"
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import { IconButton } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
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

const MobilePDFViewer = () => {
    const userdata = useSelector(state => state.signInReducer);
    let currentUserId = userdata.signInPostResponse.userSequenceId;
    const pdfUrl = useSelector(state => state.personalDevelopment.pdfUrl)
    const [pdfPath, setPdfPath] = useState(pdfUrl)
    const pdfIsbn = useSelector(state => state.personalDevelopment.pdfIsbn)
    const classes = useStyles();
    const dispatch = useDispatch()
    const requestConfig = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    const bookUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/search?bookType=Audio_Book&book_name="
    let apiUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/bookmarked_books";

    useEffect(() => {
        setPdfPath(pdfUrl)
    }, [pdfUrl])

    useEffect(() => {
        if (pdfIsbn & currentUserId) {
            dispatch(recentlyViewedBooks(pdfIsbn, currentUserId))
        }
    }, [pdfIsbn, currentUserId])

    const recentlyViewedBooks = (pdfIsbn, currentUserId) => {
        let requestBody = {
            "current_page": 0,
            "isbn": pdfIsbn,
            "user_id": currentUserId
        }

        let recentlyViewedBookUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/recently_viewed_books"
        return () => {
            return axios
                .post(recentlyViewedBookUrl, requestBody, requestConfig)
                .then((response) => {
                    console.log(response);


                })
                .catch((response) => {
                    console.log(response);
                });
        }
    }

    const saveBook = (isbn) => {
        let currentPage = document.getElementById("pageNumber").value;
        let requestBody = {
            "current_page": currentPage,
            "isbn": isbn,
            "user_id": currentUserId
        }

        return axios
            .post(apiUrl, requestBody, requestConfig)
            .then((response) => {
                console.log(response);
            })
            .catch((response) => {
                console.log(response);
            });
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <IconButton aria-label="delete">
                        <a href={pdfUrl} download={pdfUrl} target="_blank" style={{ color: '#fff' }}><CloudDownloadOutlinedIcon /></a>
                    </IconButton>
                    <div className={classes.grow} />
                    <SaveIcon onClick={() => saveBook(pdfIsbn)} />
                    <div className={classes.grow1} />
                </Toolbar>
            </AppBar>
            <MobilePDFReader url={pdfPath} />
        </React.Fragment>
    )
}

export default MobilePDFViewer