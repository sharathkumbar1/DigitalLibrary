import React, { } from "react";
import { withStyles } from "@material-ui/core/styles";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as Download } from '../../images/download.svg'
import axios from "axios";
import SaveIcon from '@material-ui/icons/Save';

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
    },
    save: {
        width: "48px",
        display: "inline",
        height: "48px",
        paddingLeft: "20px",
        fill: "#00000090",
        "&:active": {
            fill: "black",
            cursor: "pointer",
        }
    },
})

const apiUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/download_url?file_name=";
const bookUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/search?bookType=Audio_Book&book_name="


class AudioBook extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            file__name: this.props.match.params.file_name,
            title_: this.props.match.params.title,
            download_url: "",
            full_data: [],

        }
    }


    componentDidMount() {
        console.log("file-name" + this.state.file__name)
        axios
            .get(apiUrl + this.state.file__name)
            .then((response) => {
                this.setState({ "download_url": response.data })
                console.log("response data" + response.data)
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(bookUrl + this.state.title_)
            .then((res) => {
                this.setState({ "full_data": res.data })
                console.log(this.state.full_data)

            })
            .catch((err2) => {
                console.log(err2)
            })

    }

    saveAudio = (isbn) => {
        console.log("saving .... " + isbn)

        const requestConfig = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        let apiUrl = "http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/bookmarked_books";
        let requestBody = {
            "isbn": isbn,
            "user_id": 33
        }

        return axios
            .post(apiUrl, requestBody, requestConfig)
            .then((response) => {
                console.log(response);
                // console.log(JSON.parse(response.data));
                console.log(response.data.message);


            })
            .catch((response) => {
                console.log(response);
            });
    }

    downloadAudio = () => {

        return () => {

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
                    link.setAttribute('download', this.state.file__name); //any other extension
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
                {this.state.full_data.map(item => (
                    <GridList cellHeight={300} spacing={30} className={classes.gridList}>
                        <GridListTile
                            key="BookCover"
                            className={classes.coverPage}
                        >
                            <img src={item.thumbnail_url}
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
                                onPlay={() => console.log("onPlay")}
                                progressJumpStep="10000" // 10 seconds
                                autoPlayAfterSrcChange={false}
                                defaultCurrentTime="00:00"
                                defaultDuration="loading..."
                                customAdditionalControls={[
                                    <a /*href={this.state.download_url} download={this.state.download_url}*/ onClick={this.downloadAudio()}
                                    >
                                        <Download /*onClick={() => downloadFile()}*/ className={classes.download} />
                                        <SaveIcon className={classes.save} onClick={() => this.saveAudio(item.isbn)} />
                                    </a>
                                ]}
                            />
                        </GridListTile>

                        <div className={classes.bookDetails}>
                            <Typography variant="h6" className={classes.bookTitle}>
                                {this.state.title_}
                            </Typography><br />
                            <Typography variant="body2" gutterBottom>
                                Author: {item.author}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Category: {item.category}
                            </Typography>
                        </div>


                    </GridList>
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(AudioBook);





