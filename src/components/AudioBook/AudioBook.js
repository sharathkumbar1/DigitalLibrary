import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AudioBookCover from "../../images/Alice_in_Wonderland.jpg";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import {ReactComponent as Download} from '../../images/download.svg'

const useStyles = makeStyles((theme) => ({
    gridList: {
      display: "block",
      padding: "1%",
      flexWrap: "wrap",
      justifyContent: "space-around",
      backgroundColor: theme.palette.background.paper,
      margin: "0px !important",
    },
    coverPage: {
        height:"300px !important",
        width:"100% !important",
        textAlign: "center",
    },
    coverPageImage: {
        height: "inherit",
        width: "inherit",
    },
    audioPlayer: {
        height:"110px !important",
        width:"100% !important",
        padding: "15px 15px 0px 15px !important",
    },
    bookDetails: {
        width: "100% !important",
        height: "fit-content !important",
        padding: "0px 15px !important",
    },
    bookTitle: {
        color: "darkgreen",
    },
    download: {

        height: "48px",
        width: "28px",
        fill: "#00000090",
      
        '&:active': {
          fill: "black",
          cursor: "pointer",
        }
    }
  }));

const AudioBook = () => {
    const classes = useStyles();

    const bookDetails = {
        "title": "Alice's Adventures in Wonderland",
        "published_date": "26 November 1865",
        "author": "Lewis Carroll",
        "publisher": "Macmillan Publishers",
        "genres": "Fairy tale",
        "url": "https://etc.usf.edu/lit2go/audio/mp3/alices-adventures-in-wonderland-001-chapter-i-down-the-rabbit-hole.1.mp3",
    }

    // const downloadFile = () => {
    //       window.location.href = "http://samarthanamcloudservices-env.eba-qe6ed46a.ap-south-1.elasticbeanstalk.com/downloadAudio?file=file_example_MP3_700KB.mp3"
    // }
    
    return (
        <div>
            <GridList cellHeight={300} spacing={30} className={classes.gridList}>
                <GridListTile
                    key="BookCover"
                    className={classes.coverPage}
                >
                    <img src={AudioBookCover}
                        alt="Book Cover"
                        className={classes.coverPageImage}
                    />
                </GridListTile>
                <GridListTile
                    key="AudioPlayer"
                    className={classes.audioPlayer}
                >
                    <AudioPlayer
                        // src="http://devsharedstellentcontentsivr.target.com/target-com/flashvoicefiles/english/test1.mp3"
                        // src="http://samarthanamcloudservices-env.eba-qe6ed46a.ap-south-1.elasticbeanstalk.com/downloadAudio?file=file_example_MP3_700KB.mp3"
                        src={bookDetails.url}
                        onPlay={e => console.log("onPlay")}
                        progressJumpStep="10000" // 10 seconds
                        autoPlayAfterSrcChange={false}
                        defaultCurrentTime="00:00"
                        defaultDuration="loading..."
                        customAdditionalControls={[
                            <a href="http://localhost:3000/data/mp3/Alice's Adventures in Wonderland.mp3"
                                download="Alice's Adventures in Wonderland.mp3"
                            >
                            <Download /*onClick={() => downloadFile()}*/ className={classes.download} />
                            </a>
                        ]}
                    />
                </GridListTile>
                <div className={classes.bookDetails}>
                    <Typography variant="h6" className={classes.bookTitle}>
                        {bookDetails.title}
                    </Typography> 
                    <p><b>Originally published: </b>{bookDetails.published_date}</p>
                    <p><b>Author: </b>{bookDetails.author}</p>
                    <p><b>Publisher: </b>{bookDetails.publisher}</p>
                    <p><b>Genres: </b>{bookDetails.genres}</p>
                </div>
            </GridList>
        </div>
    );
};

export default AudioBook;
