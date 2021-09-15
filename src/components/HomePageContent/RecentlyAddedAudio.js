import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Divider from "@material-ui/core/Divider";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton, withStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { recentlyAddedAudioPage } from "../../config/apiCalls";

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
    paddingLeft: 18,
  },
  backArrow: {
    paddingLeft: 30,
  },
}));

function RecentlyAddedAudio() {
  const [recentlyAddedAudio, setRecentlyAddedAudio] = useState([]);
  const [setError] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    // fetch(
    //   "http://ec2-13-235-86-101.ap-south-1.compute.amazonaws.com:5000/recently_added_books?book_type=AUDIO_BOOK"
    // )
    recentlyAddedAudioPage()
      .then((res) => res.json())
      .then(
        (result) => {
          setRecentlyAddedAudio(result);
          console.log(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  const openAudioBook = (fileName, title) => {
    // const file_name = fileName + ".mp3";
    handleRoute(`/audiobook/${fileName}/${title}`);
    console.log(fileName, title);
  };

  const handleRoute = (route) => {
    history.push(`${route}`);
  };

  return (
    <div>
      <IconButton className={classes.backArrow} aria-label="back">
        <ArrowBackIcon onClick={() => handleRoute("/home")} />
      </IconButton>
      <text className={classes.fonts}>Recently Added Audibles</text>
      <Divider variant="middle" />
      <ul>
        {recentlyAddedAudio.map((item) => (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt={item.title}
                        src={item.thumbnail_url}
                        onClick={() =>
                          openAudioBook(item.file_name, item.title)
                        }
                      />
                    </ButtonBase>
                  </Grid>

                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom>{item.title}</Typography>
                      <Typography variant="body2" gutterBottom>
                        Author: {item.author_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Category: {item.category_name}
                        <br />
                        Audio time: {item.total_audio_time}
                      </Typography>
                    </Grid>
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

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(RecentlyAddedAudio));

RecentlyAddedAudio.propTypes = {
  recentlyAddedAudio: PropTypes.object,
  fileName: PropTypes.any,
};
