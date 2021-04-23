import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import carasoul1 from '../../images/carasoul1.png'
import GridList from '@material-ui/core/GridList';
import Box from '@material-ui/core/Box';
import { setPdfURL } from "../../store/personalDevelopment/actionCreator";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   backgroundColor: theme.palette.background.paper,
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  //   overflow: 'hidden',
  //   backgroundColor: theme.palette.background.paper,
  // },
  root: {
    flexGrow: 1,
  },
  overrides: {
    MuiButton: {
      text: {
        color: 'gray',
        height: 48,
        padding: '0 30px',
      },
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper1: {
    height: 140,
    width: 100,

  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    minWidth: 100,
    direction: 'row',
    float: 'left',
    width: 50,
    padding: 0
  },
  media: {
    height: 450,
    width: 400,
  },
  image: {
    width: 128,
    height: 128,

    margin: 'auto',
    padding: '1px 12px 0px 20px'
  },

  fonts: {
    fontSize: 18,
    align: 'left',
    fontWeight: 'bold',
    color: 'grey'
  },
  grid: {
    display: 'flex'
  },

  cardcontent: {
    width: 150,
    textAlign: 'left'
  },
  btnAlignRight: {
    marginLeft: '100px',
    backgroundColor: 'grey'

  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
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


  useEffect(() => {
    fetch("http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/home_page_books?user_id=23&book_type=PDF")
      .then(res => res.json())
      .then(
        (result) => {

          setHomePageBooksRA(result.recently_added_books);
          setHomePageBooksBM(result.bookmarked_books);
          setHomePageBooksRV(result.recently_viewed_books);
          console.log(result)


        },
        (error) => {
          setError(error);
        }
      )

  }, [])

  const handleRoute = (route) => {
    history.push(`${route}`);
  };
  const recentlyAddedBooks = () => {
    handleRoute("/recently_added_books")
  }



  const bookMarked = () => {
    // axios.get('http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/users/23/bookmarked_books').then(
    //     (res) => {
    //         var BMB = res.data
    //         console.log(BMB)
    //     }
    // )
    handleRoute("/book_marked_books")
  }

  const recentlyViewed = () => {
    // axios.get('http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/users/23/recently_viewed_books').then(
    //     (res) => {
    //         var RVB = res.data
    //         console.log(RVB)
    //     }
    // )
    handleRoute("/recently_viewed_books")
  }

  // const readClicked = (pdfLink) => {
  //   dispatch(setPdfURL(pdfLink));
  //   console.log("book opened")
  //   dispatch(setPdfURL("../../data/pdf/sample1.pdf"));
  //   history.push("/pdfviewer");

  // }

  const readClicked = (file_name) => {
    console.log("from recently added pdf file_name " + file_name);

    const apiUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/download_url?file_name=";
    let pdfLink = "";
    axios
      .get(apiUrl + file_name)
      .then((response) => {
        pdfLink = response.data;
        console.log("response data" + response.data)
        dispatch(setPdfURL(pdfLink));
        history.push("/pdfviewer");
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (

    <div className={classes.root}>

      <Grid container spacing={3}>

        <Grid item xs={12} className={classes.grid}>
          <Typography className={classes.fonts}> Recently Added Books              </Typography>
          <Button variant="text" className={classes.btnAlignRight} onClick={recentlyAddedBooks}>
            more &gt;
              </Button>
        </Grid>

        <GridList cellHeight='auto' className={classes.gridList} cols={3}>
          {homePageBooksRA.slice(0, 3).map((item) => (
            <Card >
              <Grid container spacing={3} >
                <Grid item xs={6} className={classes.pap}>

                  <img className={classes.image} src={item.thumbnail_url} alt={item.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = carasoul1 }}
                    onClick={() => readClicked(item.file_name)} />

                  <CardContent className={classes.cardcontent}>
                    <Typography gutterBottom variant="subtitle1" >
                      <Box whiteSpace="nowrap" component="div" textOverflow="ellipsis" overflow="hidden">
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

          ))

          }
        </GridList>

        <Grid item xs={12} className={classes.grid}>

          <Typography className={classes.fonts}>Saved Books</Typography>
          <Button variant="text" style={{ marginLeft: '180px' }} className={classes.btnAlignRight} onClick={bookMarked}>more &gt; </Button>
        </Grid>

        <GridList cellHeight='auto' className={classes.gridList} cols={3}>
          {homePageBooksBM.slice(0, 3).map((item) => (
            <Card >
              <Grid container spacing={3}>
                <Grid item xs={6} className={classes.pap}>

                  <img className={classes.image} src={item.book.thumbnail_url} alt={item.book.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = carasoul1 }}
                    onClick={() => readClicked(item.book.file_name)} />

                  <CardContent className={classes.cardcontent}>
                    <Typography gutterBottom variant="subtitle1" >
                      <Box whiteSpace="nowrap" component="div" textOverflow="ellipsis" overflow="hidden">
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
          <Button variant="text" className={classes.btnAlignRight} onClick={recentlyViewed}>more &gt; </Button>
        </Grid>

        <GridList cellHeight={270} className={classes.gridList} cols={3}>

          {homePageBooksRV.slice(0, 3).map((item) => (
            <Card >
              <Grid container spacing={3}>
                <Grid item xs={6} className={classes.pap}>

                  <img className={classes.image} src={item.book.thumbnail_url} alt={item.book.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = carasoul1 }}
                    onClick={() => readClicked(item.book.file_name)} />

                  <CardContent className={classes.cardcontent}>
                    <Typography gutterBottom variant="subtitle1" >
                      <Box whiteSpace="nowrap" component="div" textOverflow="ellipsis" overflow="hidden">
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
    </div>

  );
}





export default HomePDFBooks
















