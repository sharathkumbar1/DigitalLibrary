import React, { Component,useState, useEffect } from 'react';
import HomePDFBooks from './HomePDFBooks'
import { makeStyles } from '@material-ui/core/styles';
import PDFBookCover from '../../images/PDFBookCover.jpg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import { IconButton} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { setPdfURL } from "../../store/personalDevelopment/actionCreator";
import { useDispatch } from "react-redux";
import carasoul1 from '../../images/carasoul1.png'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'left',
      maxWidth: 450,
      paddingLeft : 10,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    fonts:{
        fontSize:20,
        fontStyle: 'italic',
        align: 'left',
        fontWeight : 'bold',
       color:'darkgreen'
       
    },
  }));

function RecentlyAdded() {
    const [recentlyAdded, setRecentlyAdded] = useState([]);
    const [error, setError] = useState(null);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
 

    useEffect(() => {
        fetch("http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/recently_added_books?book_type=PDF")
           .then(res => res.json())
           .then(
             (result) => {
                 
                     setRecentlyAdded(result);
                     console.log(result)
                },
             (error) => {
                setError(error);
             }
           )
           
       }, [])

       const readClicked = (pdfLink) => {
         console.log("from recently added pdflink "+ pdfLink)
        dispatch(setPdfURL("../../data/pdf/sample1.pdf"));
        history.push("/pdfviewer");
        console.log("book opened")
      };

     
       return(
           
        <div>
           <text className={classes.fonts}>Recently Added Books</text> 
            <Divider variant="middle" />
            <ul>
    {recentlyAdded.map(item => (
        <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={item.thumbnail_url} 
              onError={(e)=>{e.target.onerror = null; e.target.src= carasoul1}} 
              />
            </ButtonBase>
          </Grid>
        
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {item.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Author: {item.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {item.category}<br/>
                  Page No. {item.total_pages}
                </Typography>
              </Grid>
              <Grid item>
                {/* <Typography variant="body2" style={{ cursor: 'pointer' }} button>
                  Read
                </Typography> */}
                <IconButton aria-label="delete">
                  <ImportContactsOutlinedIcon  onClick={() => readClicked(item.thumbnail_url)}/>
                </IconButton>
                <IconButton aria-label="delete">
                  <a href={item.file_name} download={item.title}><CloudDownloadOutlinedIcon /></a>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
             
))}
  </ul>

        </div>
    )

}

    
//         return(
           
//             <div>
//                 <ul>
//         {recentlyAdded.map(item => (
//     <Card className={classes.root}>
//     <CardActionArea >
//       <img
//             src={PDFBookCover}
//             alt="logofile"
//             className={classes.media}
            
//           />
//       <CardContent className={classes.cardContent}>
//         <Typography  gutterBottom variant="h5" component="h2">
//           {item.title}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p">
//           {item.author} <br/>
//           Edition Version : {item.edition_version}
//         </Typography>
//       </CardContent>
//     </CardActionArea>
//     <CardActions>
//       <Button size="small" color="primary">
//         Share
//       </Button>
//       <Button size="small" color="primary">
//         Learn More
//       </Button>
//     </CardActions>
//   </Card>
                 
//   ))}
//       </ul>



      
//             </div>
//         )
    
// }

export default RecentlyAdded