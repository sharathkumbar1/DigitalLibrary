import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import tileData from "./../HomePageContent/tileData";
import Typography from "@material-ui/core/Typography";
import { setPdfURL } from "../../store/personalDevelopment/actionCreator";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, IconButton, ListItem } from "@material-ui/core";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});

const PersonalDevelopment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const id = window.location.pathname.split("/")[2];

  const populateBooksData = () => {
    const arr = [];

    tileData.forEach((booksData) => {
      if (booksData.id == id) {
        arr.push(populateBooks(booksData));
      }
    });

    return arr;
  };

  const populateBooks = (ibooks) => {
    const arr1 = [];

    ibooks.books.forEach((booksData) => {
      arr1.push(
        <div>
          <ListItem className={classes.individualShift}>
            <Grid container spacing={1}>
              <Grid item xs={8} spacing={3}>
                <Grid container spacing={1}>
                  <Typography
                    className={classes.title}
                    color="textPrimary"
                    gutterBottom
                  >
                    Book: <b>{booksData.bookName}</b>
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Author: <b>{booksData.Author}</b>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={2} spacing={3}>
                <IconButton aria-label="delete">
                  <ImportContactsOutlinedIcon onClick={() => readClicked(booksData.pdflink)} />
                </IconButton>
              </Grid>
              <Grid item xs={2} spacing={3}>
                <IconButton aria-label="delete">
                  <a href={booksData.pdflink} download={booksData.bookName}><CloudDownloadOutlinedIcon /></a>
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        </div>
      );
    });

    return arr1;
  };

  const readClicked = (pdfLink) => {
    dispatch(setPdfURL(pdfLink));
    history.push("/pdfviewer");
  };


  return (
    <div>
      <div>{populateBooksData()}</div>
    </div>
  );
};

export default PersonalDevelopment;
