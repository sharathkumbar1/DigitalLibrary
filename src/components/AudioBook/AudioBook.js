import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AudioBookCover from "../../images/Alice_in_Wonderland.jpg";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as Download } from '../../images/download.svg'
import axios from "axios";

const styles = theme => ({
    gridList: {
        display: "block",
        padding: "1%",
        flexWrap: "wrap",
        justifyContent: "space-around",
        backgroundColor: theme.palette.background.paper,
        margin: "0px !important",
    },
    coverPage: {
        height: "300px !important",
        width: "100% !important",
        textAlign: "center",
    },
    coverPageImage: {
        height: "inherit",
        width: "inherit",
    },
    audioPlayer: {
        height: "110px !important",
        width: "100% !important",
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
})

const apiUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/download_url?file_name=";

const bookDetails = {
    "title": "Alice's Adventures in Wonderland",
    "file_name": "alices-adventures-in-wonderland-001-chapter-i-down-the-rabbit-hole.1.mp3",
    "published_date": "26 November 1865",
    "author": "Lewis Carroll",
    "publisher": "Macmillan Publishers",
    "genres": "Fairy tale",
    "download_url": ""
};

class AudioBook extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            download_url: ""
        }
    }

    componentDidMount() {
        axios
            .get(apiUrl + bookDetails.file_name)
            .then((response) => {
                this.setState({ "download_url": response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    downloadAudio = (values) => {
        return (dispatch) => {
            const method = 'GET';
            const url = this.state.download_url;
            axios
                .request({
                    url,
                    method,
                    responseType: 'blob',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then(({ data }) => {
                    const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.setAttribute('download', 'file.mp3'); //any other extension
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
        };
    }

    render() {
        const { classes } = this.props
        console.log(this.state.download_url)

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
                            src={this.state.download_url}
                            onPlay={e => console.log("onPlay")}
                            progressJumpStep="10000" // 10 seconds
                            autoPlayAfterSrcChange={false}
                            defaultCurrentTime="00:00"
                            defaultDuration="loading..."
                            customAdditionalControls={[
                                <a onClick={this.downloadAudio()}  /*target="_blank" rel="noopener noreferrer"*/
                                // download="Alice's Adventures in Wonderland.mp3"
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
    }
}

export default withStyles(styles)(AudioBook);
