import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import {
  setPdfURL,
  setPdfISBN,
} from "../../store/personalDevelopment/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { readPDF, viewedPDFPage } from "../../config/apiCalls";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "left",
    maxWidth: 450,
    paddingLeft: 10,
    position: 'relative',
    right: '20px'
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  fonts: {
    fontSize: 20,
    fontStyle: "italic",
    align: "left",
    fontWeight: "bold",
    color: "darkgreen",
  },
}));

function RecentlyViewed() {
  const [recentlyBooks, setRecentlyBooks] = useState([]);
  const [setError] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.signInReducer);

  useEffect(() => {
    let currentUserId = userdata.signInPostResponse.userSequenceId;
    console.log(" user id ", currentUserId);

    viewedPDFPage(currentUserId)
      .then((res) => res.json())
      .then(
        (result) => {
          setRecentlyBooks(result);
          console.log(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  const readClicked = (file_name, isbn) => {
    let pdfLink = "";

    readPDF(file_name)
      .then((response) => {
        pdfLink = response.data;
        console.log("response data" + response.data);
        dispatch(setPdfURL(pdfLink));
        dispatch(setPdfISBN(isbn));
        history.push("/pdfviewer");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRoute = (route) => {
    history.push(`${route}`);
  };

  return (
    <div>
      <IconButton className={classes.backArrow} aria-label="back">
        <ArrowBackIcon onClick={() => handleRoute("/home")} />
      </IconButton>
      <text className={classes.fonts}>Recently Viewed Books</text>
      <Divider variant="middle" />
      <ul>
        {recentlyBooks.map((item) => (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item>
                    <ButtonBase
                      className={classes.image}
                      onClick={() =>
                        readClicked(item.book.file_name, item.book.isbn)
                      }
                    >
                      <img
                        className={classes.img}
                        alt={item.book.title}
                        src={item.book.thumbnail_url}
                      />
                    </ButtonBase>
                  </Grid>

                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom>{item.book.title}</Typography>
                      <Typography variant="body2" gutterBottom>
                        Author: {item.book.author_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Category: {item.book.category_name}
                        <br />
                        Page No. {item.book.total_pages}
                      </Typography>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default RecentlyViewed;
