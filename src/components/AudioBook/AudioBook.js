import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AudioBookCover from "../../images/AudioBookCover.jpg";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
    gridList: {
      display: "block",
      padding: "1%",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "scroll",
      backgroundColor: theme.palette.background.paper,
      margin: "0px !important",
    },
    coverPage: {
        height:"350px !important",
        width:"100% !important",
        textAlign: "center",
    },
    coverPageImage: {
        height: "inherit",
        width: "inherit",
    },
    audioPlayer: {
        height:"125px !important",
        width:"100% !important",
    }
  }));

const AudioBook = () => {
    const classes = useStyles();

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
                        src="http://samarthanamcloudservices-env.eba-qe6ed46a.ap-south-1.elasticbeanstalk.com/downloadAudio?file=file_example_MP3_700KB.mp3"
                        onPlay={e => console.log("onPlay")}
                        progressJumpStep="10000" // 10 seconds
                        autoPlayAfterSrcChange={false}
                        defaultCurrentTime="00:00"
                        defaultDuration="loading..."
                        customAdditionalControls={[]}
                    />
                </GridListTile>
            </GridList>
        </div>
    );
};

export default AudioBook;
