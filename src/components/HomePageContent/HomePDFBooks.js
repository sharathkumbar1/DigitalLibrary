import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import carasoul1 from "../../images/carasoul1.png";
import GridList from "@material-ui/core/GridList";
import Box from "@material-ui/core/Box";
import {
  setPdfURL,
  setPdfISBN,
} from "../../store/personalDevelopment/actionCreator";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    minWidth: 100,
    direction: "row",
    float: "left",
    width: 50,
    padding: 0,
  },
  media: {
    height: 140,
  },
  gridList: {
    width: "400px",
    padding: "10px 0px 10px 10px",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  image: {
    width: 128,
    height: 128,
    margin: "auto",
    padding: "1px 18px 0px 15px",
  },
  cardcontent: {
    width: 150,
    textAlign: "left",
  },
  fonts: {
    fontSize: 18,
    align: "left",
    fontWeight: "bold",
    color: "grey",
  },
  grid: {
    display: "flex",
  },
  btnAlignRight: {
    marginLeft: "50px",
    backgroundColor: "grey",
  },
}));

const HomePDFBooks = () => {
  const classes = useStyles();
  const [homePageBooksRA, setHomePageBooksRA] = useState([]);
  const [homePageBooksBM, setHomePageBooksBM] = useState([]);
  const [homePageBooksRV, setHomePageBooksRV] = useState([]);
  const [error, setError] = useState(null);
  let history = useHistory();
  let dispatch = useDispatch();
  const [filterPDF, setFilterPDF] = useState(false);
  const userdata = useSelector((state) => state.signInReducer);

  useEffect(() => {
    let currentUserId = userdata.signInPostResponse.userSequenceId;
    fetch(
      "http://ec2-13-235-86-101.ap-south-1.compute.amazonaws.com:5000/home_page_books?user_id=" +
        currentUserId +
        "&book_type=PDF"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setHomePageBooksRA(result.recently_added_books);
          setHomePageBooksBM(result.bookmarked_books);
          setHomePageBooksRV(result.recently_viewed_books);
          console.log(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  const handleRoute = (route) => {
    history.push(`${route}`);
  };

  const recentlyAddedBooks = () => {
    handleRoute("/recently_added_books");
  };

  const bookMarked = () => {
    handleRoute("/book_marked_books");
  };

  const recentlyViewed = () => {
    handleRoute("/recently_viewed_books");
  };

  const readClicked = (file_name, isbn) => {
    console.log("from recently added pdf isbn " + isbn);
    console.log("file name qq " + file_name);

    const apiUrl =
      "http://ec2-13-235-86-101.ap-south-1.compute.amazonaws.com:5000/download_url?file_name=";
    let pdfLink = "";
    axios
      .get(apiUrl + file_name + ".pdf")
      .then((response) => {
        pdfLink = response.data;
        console.log("response data qqqq" + response.data);
        dispatch(setPdfURL(pdfLink));
        dispatch(setPdfISBN(isbn));
        history.push("/pdfviewer");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.grid}>
        <Typography className={classes.fonts}>
          {" "}
          Recently Added Books{" "}
        </Typography>
        <Button
          variant="text"
          aria-label="Recently added books more"
          style={{ marginLeft: "115px" }}
          className={classes.btnAlignRight}
          onClick={recentlyAddedBooks}
        >
          more &gt;
        </Button>
      </Grid>

      <GridList cellHeight="auto" className={classes.gridList} cols={3}>
        {homePageBooksRA.slice(0, 3).map((item, index) => (
          <Card key={index}>
            <Grid container spacing={3}>
              <Grid item xs={6} className={classes.pap}>
                <img
                  className={classes.image}
                  src={item.thumbnail_url}
                  alt={item.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = carasoul1;
                  }}
                  onClick={() => readClicked(item.file_name, item.isbn)}
                />

                <CardContent className={classes.cardcontent}>
                  <Typography gutterBottom>
                    <Box
                      whiteSpace="nowrap"
                      component="div"
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      {item.title}
                    </Box>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.author}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </GridList>

      <Grid item xs={12} className={classes.grid}>
        <Typography className={classes.fonts}>Bookmarked Books</Typography>
        <Button
          variant="text"
          style={{ marginLeft: "145px" }}
          className={classes.btnAlignRight}
          onClick={bookMarked}
        >
          more &gt;{" "}
        </Button>
      </Grid>

      <GridList cellHeight="auto" className={classes.gridList} cols={3}>
        {homePageBooksBM.slice(0, 3).map((item, index) => (
          <Card key={index}>
            <Grid container spacing={3}>
              <Grid item xs={6} className={classes.pap}>
                <img
                  className={classes.image}
                  src={item.book.thumbnail_url}
                  alt={item.book.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = carasoul1;
                  }}
                  onClick={() =>
                    readClicked(item.book.file_name, item.book.isbn)
                  }
                />
                <CardContent className={classes.cardcontent}>
                  <Typography gutterBottom>
                    <Box
                      whiteSpace="nowrap"
                      component="div"
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      {item.book.title}
                    </Box>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.book.author}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </GridList>

      <Grid item xs={12} className={classes.grid}>
        <Typography className={classes.fonts}>Recently Viewed Books</Typography>
        <Button
          variant="text"
          style={{ marginLeft: "110px" }}
          className={classes.btnAlignRight}
          onClick={recentlyViewed}
        >
          more &gt;{" "}
        </Button>
      </Grid>

      <GridList cellHeight={270} className={classes.gridList} cols={3}>
        {homePageBooksRV.slice(0, 3).map((item, index) => (
          <Card key={index}>
            <Grid container spacing={3}>
              <Grid item xs={6} className={classes.pap}>
                <img
                  className={classes.image}
                  src={item.book.thumbnail_url}
                  alt={item.book.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = carasoul1;
                  }}
                  onClick={() =>
                    readClicked(item.book.file_name, item.book.isbn)
                  }
                />
                <CardContent className={classes.cardcontent}>
                  <Typography gutterBottom>
                    <Box
                      whiteSpace="nowrap"
                      component="div"
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      {item.book.title}
                    </Box>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.book.author}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </GridList>
    </Grid>
  );
};
export default HomePDFBooks;
