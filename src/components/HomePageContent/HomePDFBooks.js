
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { setBackToComponent } from "../../store/header/actionCreator";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PersonalDevelopment from '../PersonalDevelopment/PersonalDevelopment';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormatAlignLeft, FormatAlignRight } from '@material-ui/icons';
import * as ReactDOM from 'react-dom';
import { Link, useHistory, NavLink } from "react-router-dom";
import SimpleCard from './SimpleCard';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import PDFBookCover from '../../images/PDFBookCover.jpg';
import carasoul1 from '../../images/carasoul1.png'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';
import { setPdfURL } from "../../store/personalDevelopment/actionCreator";

// const theme = createMuiTheme({
//   overrides: {
//     // Style sheet name :atom_symbol:
//     MuiButton: {
//       // Name of the rule
//       text: {
//         // Some CSS
//         color: 'gray',
//         height: 48,
//         padding: '0 30px',
//       },
//     },
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    flexGrow: 1,
  },
  overrides: {
    // Style sheet name :atom_symbol:
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
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
  gridList: {
    width: '400px',
    height: '200px',
    padding: '10px 0px 20px 10px',
    marginBottom: '10px',
    overflow: 'hidden'
  },
  btnAlignRight: {
    marginLeft: '100px',
    backgroundColor: 'grey'

  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const apiUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/download_url?file_name=";

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

  const readClicked = (pdfLink) => {
    dispatch(setPdfURL(pdfLink));
    console.log("book opened")
    dispatch(setPdfURL("../../data/pdf/sample1.pdf"));
    history.push("/pdfviewer");

  }

  //   defaultImg(ev){
  //     ev.target.src = '../../images/PDFBookCover.jpg'
  //   }

  return (

    <div className={classes.root}>

      <Grid container spacing={3}>

        <Grid item xs={12} className={classes.grid}>
            <Typography className={classes.fonts}> Recently Added Books</Typography>
              <Button  variant="text" className={classes.btnAlignRight} onClick={recentlyAddedBooks}> 
              more &gt;
              </Button>
        </Grid>

        <GridList cellHeight='200' className={classes.gridList} cols={3}>
          {homePageBooksRA.map((item) => (

            // <Card >
            // <Grid container spacing={3}>
            // <Grid item xs={12} className={classes.pap}>

            //   <img  className={classes.image} src={item.thumbnail_url} alt={item.title} 
            //     onError={(e)=>{e.target.onerror = null; e.target.src= carasoul1}}
            //     onClick={() => readClicked(item.pdflink)} />

            //   <CardContent className={classes.cardcontent}>
            // <Typography gutterBottom variant="subtitle1">
            //           {item.title}
            //         </Typography>
            //         <Typography variant="body2" gutterBottom>
            //           Author: {item.author}
            //         </Typography>
            // </CardContent>
            // </Grid>
            // </Grid>
            // </Card>

            <GridListTile className={classes.gridListTile}>
              <img src={item.thumbnail_url} alt={item.title}
                onError={(e) => { e.target.onerror = null; e.target.src = carasoul1 }}
                onClick={() => readClicked(item.pdflink)} />
              <GridListTileBar
                title={item.title}
                subtitle={<span>by: {item.author}</span>}
              />
            </GridListTile>
          ))}
        </GridList>

        <Grid item xs={12} className={classes.grid}>
          
            <Typography className={classes.fonts}>Book Marked Books</Typography> 
             <Button variant="text" className={classes.btnAlignRight} onClick={bookMarked}>more &gt; </Button>
            </Grid>

          <GridList cellHeight={200} className={classes.gridList} cols={3}>
            {homePageBooksBM.map((item) => (
              <GridListTile>
                <img src={item.book.thumbnail_url} alt={item.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = carasoul1 }}
                  onClick={() => readClicked(item.pdflink)} />
                <GridListTileBar
                  title={item.book.title}
                  subtitle={<span>by: {item.book.author}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        

        <Grid item xs={12} className={classes.grid}>
          
            <Typography className={classes.fonts}>Recently Viewed Books</Typography> 
            <Button variant="text" className={classes.btnAlignRight} onClick={recentlyViewed}>more &gt; </Button>
        </Grid>

          <GridList cellHeight={200} className={classes.gridList} cols={3}>

            {homePageBooksRV.map((item) => (
              <GridListTile>
                <img src={item.book.thumbnail_url} alt={item.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = carasoul1 }}
                  onClick={() => readClicked(item.pdflink)} />
                <GridListTileBar
                  title={item.book.title}
                  subtitle={<span>by: {item.book.author}</span>}
                />
              </GridListTile>
            ))}

          </GridList>
        
      </Grid>
    </div>

  );
}





export default HomePDFBooks









