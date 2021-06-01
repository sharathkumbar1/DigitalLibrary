
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import carasoul1 from '../../images/carasoul1.png'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
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
  card: {
    minWidth: 100,
    direction: 'row',
    float: 'left',
    width: 50,
    padding: 0
  },
  media: {
    height: 140,
  },
  // image: {
  //   width: 128,
  //   height: 128,
  // },

  // fonts: {
  //   fontSize: 18,
  //   fontStyle: 'italic',
  //   align: 'left',
  //   fontWeight: 'bold',
  //   color: 'darkgreen'
  // },
  gridList: {
    width: '400px',

    padding: '10px 0px 10px 10px',

  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  image: {
    width: 128,
    height: 128,

    margin: 'auto',
    padding: '1px 18px 0px 15px'
  },
  cardcontent: {
    width: 150,
    textAlign: 'left',
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
  btnAlignRight: {
    marginLeft: '50px',
    backgroundColor: 'grey'

  },

}));
const HomeAudioBooks = () => {
  const classes = useStyles();
  const [homeAudioBooksRA, setHomeAudioBooksRA] = useState([]);
  const [homeAudioBooksBM, setHomeAudioBooksBM] = useState([]);
  const [homeAudioBooksRV, setHomeAudioBooksRV] = useState([]);
  const [error, setError] = useState(null);
  let history = useHistory();
  const userdata = useSelector(state => state.signInReducer);
  
  useEffect(() => {
    let currentUserId = userdata.signInPostResponse.userSequenceId;
    console.log(" user id ", currentUserId)

    fetch("http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/home_page_books?user_id="+currentUserId+"&per_page=3&book_type=AUDIO_BOOK")
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

  const recentlyViewed = () => {
    handleRoute("/viewed_audiobooks")
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.grid}>
          <Typography className={classes.fonts}> Recently Added Audio Books</Typography>
          <Button variant="text" className={classes.btnAlignRight} onClick={recentlyAddedAudioBooks}>
            more &gt;
              </Button>
        </Grid>

        <GridList cellHeight='auto' className={classes.gridList} cols={3}>
          {homeAudioBooksRA.slice(0, 3).map((item) => (
            <Card >
              <Grid container spacing={6}>
                <Grid item xs={6} className={classes.pap}>

                  <img className={classes.image} src={item.thumbnail_url} alt={item.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = carasoul1 }}
                    onClick={() => handleRoute(`/audiobook/${item.file_name}/${item.title}`)}
                  />

                  <CardContent className={classes.cardcontent}>
                    <Tooltip title={item.title}>
                      <Typography gutterBottom variant="subtitle1" >
                        <Box whiteSpace="nowrap" component="div" textOverflow="ellipsis" overflow="hidden">
                          {item.title}
                        </Box>
                      </Typography>
                    </Tooltip>
                    <Typography variant="body2" gutterBottom>
                      {item.author}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}
        </GridList>

        <Grid item xs={12}>
          <Grid item xs={12} className={classes.grid}>
            <Typography className={classes.fonts}> Saved Audio Books</Typography>
            <Button variant="text" style={{ marginLeft: '135px' }} className={classes.btnAlignRight} onClick={bookMarkedAudio}>
              more &gt;
              </Button>
          </Grid>
          <GridList cellHeight='auto' className={classes.gridList} cols={3}>
            {homeAudioBooksBM.map((item) => (
              <Card >
                <Grid container spacing={6}>
                  <Grid item xs={6} className={classes.pap}>

                    <img className={classes.image} src={item.book.thumbnail_url} alt={item.book.title}
                      onError={(e) => { e.target.onerror = null; e.target.src = carasoul1 }}
                      onClick={() => handleRoute(`/audiobook/${item.book.file_name}/${item.book.title}`)}
                    />

                    <CardContent className={classes.cardcontent}>
                      <Tooltip title={item.book.title}>
                        <Typography gutterBottom variant="subtitle1" >

                          <Box whiteSpace="nowrap" component="div" textOverflow="ellipsis" overflow="hidden">
                            {item.book.title}
                          </Box>

                        </Typography>
                      </Tooltip>
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

        <Grid item xs={12}>
          <Grid item xs={12} className={classes.grid}>
            <Typography className={classes.fonts}> Recently Viewed Audio Books</Typography>
            <Button variant="text" className={classes.btnAlignRight} onClick={recentlyViewed}>
              more &gt;
              </Button>
          </Grid>
          <GridList cellHeight={270} className={classes.gridList} cols={3}>
            {homeAudioBooksRV.map((item) => (
              <Card >
                <Grid container spacing={6}>
                  <Grid item xs={6} className={classes.pap}>
                    <img className={classes.image} src={item.book.thumbnail_url} alt={item.book.title}
                      onError={(e) => { e.target.onerror = null; e.target.src = carasoul1 }}
                      onClick={() => handleRoute(`/audiobook/${item.book.file_name}/${item.book.title}`)}
                    />
                    <CardContent className={classes.cardcontent}>
                      <Tooltip title={item.book.title}>
                        <Typography gutterBottom variant="subtitle1" >
                          <Box whiteSpace="nowrap" component="div" textOverflow="ellipsis" overflow="hidden">
                            {item.book.title}
                          </Box>
                        </Typography>
                      </Tooltip>
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
      </Grid>
    </div>

  );
}

export default HomeAudioBooks