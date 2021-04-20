
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
 import { makeStyles } from "@material-ui/core/styles";


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import { Link, useHistory, NavLink} from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import carasoul1 from '../../images/carasoul1.png'
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 2000,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    title: {
        fontSize: 12,
      },
      pos: {
        marginBottom: 12,
      },
      card:{
        minWidth: 100,
        direction: 'row',
        float: 'left',
  width: 50,
  padding: 0
        },
    media: {
            height: 140,
          },
          image: {
            width: 128,
            height: 128,
          },

    fonts:{
        fontSize:18,
        fontStyle: 'italic',
        align: 'left',
        fontWeight : 'bold',
       color:'darkgreen'
    },
    gridList: {
      width: '400px',
      height: '350px',
      padding: '10px 0px 10px 10px',
        
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
      image: {
        width: 150,
        height: 128,
        margin: 'auto',
        padding: '1px 6px 1px 50px'
      },
      cardcontent:{
        width: 200,
        textAlign:'left',
      },
  }));
 const HomeAudioBooks = ()=>{
    const classes = useStyles();
    const [homeAudioBooksRA, setHomeAudioBooksRA] = useState([]);
    const [homeAudioBooksBM, setHomeAudioBooksBM] = useState([]);
    const [homeAudioBooksRV, setHomeAudioBooksRV] = useState([]);
    const [error, setError] = useState(null);
    let history = useHistory();
    let dispatch = useDispatch();
    const [filterPDF, setFilterPDF] = useState(false);

     
    useEffect(() => {
       fetch("http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/home_page_books?user_id=23&per_page=1&book_type=AUDIO_BOOK")
          .then(res => res.json())
          .then(
            (result) => {
              
                    setHomeAudioBooksRA(result.recently_added_books);
                    setHomeAudioBooksBM(result.bookmarked_books);
                    setHomeAudioBooksRV(result.recently_viewed_books);
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

   const recentlyAddedAudioBooks = () => {
    handleRoute("/recently_added_audiobooks")
   }

   

   const bookMarkedAudio = () => {
    handleRoute("/book_marked_audiobooks")
}

const recentlyViewed= () => {
    // axios.get('http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/users/23/recently_viewed_books').then(
    //     (res) => {
    //         var RVB = res.data
    //         console.log(RVB)
    //     }
    // )
    handleRoute("/viewed_audiobooks")
}

// const readClicked = (pdfLink) => {
//     dispatch(setPdfURL(pdfLink));
//     console.log("book opened")
//     history.push("/er");

//   };



       return (

              <div className={classes.root}>
                 
      <Grid container spacing={3}>
      
        <Grid item xs={12} >
        <Paper className={classes.paper} textAlign='left'>
           <text className={classes.fonts}> Recently Added Audio Books</text><br/>
           <Link>
            <Button variant="contained" color="secondary" onClick={recentlyAddedAudioBooks}>
        more >
      </Button>
      </Link>
        
        </Paper>
        </Grid>
        


<GridList cellHeight='auto' className={classes.gridList}>

        {homeAudioBooksRA.map((item) => (
        <Card >
        <Grid container spacing={6}>
        <Grid item xs={6} className={classes.pap}>
       
          <img  className={classes.image} src={item.thumbnail_url} alt={item.title} 
            onError={(e)=>{e.target.onerror = null; e.target.src= carasoul1}}
            onClick={() => handleRoute(`/audiobook/${item.file_name}/${item.title}`)}
           />
        
          <CardContent className={classes.cardcontent}>
         <Typography gutterBottom variant="subtitle1">
                  {item.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Author: {item.author}
                </Typography>
        </CardContent>
        </Grid>
        </Grid>
        </Card>
        ))}

      </GridList>


        <Grid item xs={12}>
          <Paper className={classes.paper}>
              <text className={classes.fonts}>Book Marked Audio Books</text> <br/>
              <Link>
               <Button variant="contained" color="secondary" onClick={bookMarkedAudio}>more > 
               </Button>
               </Link>
            
          </Paper>

          <GridList cellHeight='auto' className={classes.gridList}>

        {homeAudioBooksBM.map((item) => (
        // <GridListTile>
        //     <img src={item.book.thumbnail_url} alt={item.title} />
        //     <GridListTileBar
        //       title={item.book.title}
        //       subtitle={<span>by: {item.book.author}</span>}
        //     />
        //   </GridListTile>
        <Card >
        <Grid container spacing={6}>
        <Grid item xs={6} className={classes.pap}>
       
          <img  className={classes.image} src={item.book.thumbnail_url} alt={item.book.title} 
            onError={(e)=>{e.target.onerror = null; e.target.src= carasoul1}}
            onClick={() => handleRoute(`/audiobook/${item.book.file_name}/${item.book.title}`)}
           />
        
          <CardContent className={classes.cardcontent}>
         <Typography gutterBottom variant="subtitle1">
                  {item.book.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Author: {item.book.author}
                </Typography>
        </CardContent>
        </Grid>
        </Grid>
        </Card>
        ))}

      </GridList>


        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <text className={classes.fonts}>Recently Viewed Audio Books</text> <br/>
              <Link>
               <Button variant="contained" color="secondary" onClick={recentlyViewed}>more > 
               </Button>
               </Link>
          </Paper>
          <GridList cellHeight='auto' className={classes.gridList}>

        {homeAudioBooksRV.map((item) => (
        // <GridListTile>
        //     <img src={item.book.thumbnail_url} alt={item.title} />
        //     <GridListTileBar
        //       title={item.book.title}
        //       subtitle={<span>by: {item.book.author}</span>}
        //     />
        //   </GridListTile>
        <Card >
        <Grid container spacing={6}>
        <Grid item xs={6} className={classes.pap}>
       
          <img  className={classes.image} src={item.book.thumbnail_url} alt={item.book.title} 
            onError={(e)=>{e.target.onerror = null; e.target.src= carasoul1}}
            onClick={() => handleRoute(`/audiobook/${item.book.file_name}/${item.book.title}`)}
           />
        
          <CardContent className={classes.cardcontent}>
         <Typography gutterBottom variant="subtitle1">
                  {item.book.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Author: {item.book.author}
                </Typography>
        </CardContent>
        </Grid>
        </Grid>
        </Card>
        ))}

      </GridList>
        </Grid>
        </Grid>
    </div> 
          
        );
      }
    




  export default HomeAudioBooks





   
       
   

