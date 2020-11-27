import React, { useState } from "react";

import { MobilePDFReader } from "reactjs-pdf-reader";
import { makeStyles } from "@material-ui/core/styles";
import tileData from "./../HomePageContent/tileData";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

const PersonalDevelopment = (props) => {
  const classes = useStyles();
  const id = window.location.pathname.split("/")[2];

  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [pdfPath, setPdfPath] = useState("");

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
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                {booksData.bookName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="button-block"
                onClick={() => readClicked(booksData.pdflink)}
              >
                Read
              </Button>
            </CardActions>
          </Card>
        </div>
      );
    });

    return arr1;
  };

  const readClicked = (pdfLink) => {
    console.log(pdfLink);
    setShowPDFViewer(true);
    setPdfPath(pdfLink);
  };

  return (
    <div>
      <h1>{tileData[id - 1].category}</h1>

      {!showPDFViewer && <div>{populateBooksData()}</div>}

      {showPDFViewer && (
        <div>
          <div
            style={{
              overflow: "scroll",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.8)",
              width: "100%",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              position:"fixed",
              zIndex: "2",
              cursor: "pointer",
            }}
          >
            <MobilePDFReader url={pdfPath} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDevelopment;
