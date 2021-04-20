// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// import GridListTileBar from "@material-ui/core/GridListTileBar";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
// import tileData from "./tileData";
// import { setBackToComponent } from "../../store/header/actionCreator";
// import PDFBookCover from "../../images/PDFBookCover.jpg";
// import AudioBookCover from "../../images/Alice_in_Wonderland.jpg";
// import axios from "axios";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     overflow: "hidden",
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     // width: 1000,
//     // height: 1000,
//     padding: "1%",
//     margin: "1% !important",
//     overflowY: "initial",
//   },
//   gridTile: {
//     width: "50% !important",
//     maxWidth: "170px",
//     height: "235px !important",
//     padding: "2% !important",
//   },
//   titleBar: {
//     background:
//       "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
//   },
//   icon: {
//     color: "rgba(255, 255, 255, 0.54)",
//   },
//   coverPageImage: {
//     height: "inherit",
//   },
// }));

// const HomePageContent = (props) => {
//   const dispatch = useDispatch();
//   const classes = useStyles();
//   const history = useHistory();
//   const [homePagebooks, setHomePageBooks] = useState([]);

//   useEffect(() => {
//     //dispatch(setBackToComponent(null));
//   });

//   const handleRoute = (route) => {
//     props.history.push(`/${route}`);
//   };

//   const onImageClick = (id) => {
//     console.log("onIMageClick ");
//     dispatch(setBackToComponent("/personaldev/" + id));
//     history.push("/personaldev/" + id);
//   };

//   const onImageClick1 = () => {
//     console.log("onIMageClick1");
//     dispatch(setBackToComponent("/personaldev/" + 1));
//     history.push("/personaldev/" + 1);
//     // axios.get('http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/home_page_books').then(
//     //   res => {
//     //     setHomePageBooks(res.data)
//     //     console.log(res.data)
//     //   }
//     // )
//   };

//   const apiCall = () => {
//     axios.get('http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/home_page_books').then(
//       res => {
//         setHomePageBooks(res.data)
//         console.log(res.data)
//       }
//     )
    
//   }

//   return (
//     // <div className={classes.root}>
//     //   <GridList cellHeight={300} spacing={60} className={classes.gridList}>
//     //     <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
//     //       <ListSubheader component="div"></ListSubheader>
//     //     </GridListTile>
//     //     {tileData.map((tile) => (
//     //       <GridListTile key={tile.img}>
//     //         <img
//     //           src={tile.img}
//     //           alt={tile.title}
//     //           onClick={() => onImageClick(tile.id)}
//     //         />

//     //         <GridListTileBar
//     //           title={tile.category}
//     //           actionIcon={
//     //             <>
//     //               <IconButton
//     //                 aria-label={`info about ${tile.title}`}
//     //                 className={classes.icon}
//     //               >
//     //                 <InfoIcon />
//     //               </IconButton>
//     //             </>
//     //           }
//     //         />
//     //       </GridListTile>
//     //     ))}
//     //   </GridList>
//     // </div>
//     <div className={classes.root}>
//       <GridList cellHeight={300} spacing={30} className={classes.gridList}>
//         <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
//           <ListSubheader component="div"></ListSubheader>
//         </GridListTile>
//         <GridListTile
//           key="PDFBooks"
//           onClick={() => onImageClick1()}
//           // onClick={() => apiCall()}
//           className={classes.gridTile}
//         >
//           <img src={PDFBookCover}
//             alt="Book Cover"
//             className={classes.coverPageImage}
//           />

//           <GridListTileBar
//             title="PDF Books"
//             // subtitle={<span>By: Author</span>}
//           />
//         </GridListTile>
//         <GridListTile
//           key="AudioBook"
//           onClick={() => handleRoute('audiobook')}
//           className={classes.gridTile}
//         >
//           <img src={AudioBookCover}
//             alt="Book Cover"
//             className={classes.coverPageImage}
//           />

//           <GridListTileBar
//             title="Audio Book"
//             // subtitle={<span>By: Lewis Carroll</span>}
//           />
//         </GridListTile>

//       </GridList>
//       <button onClick={apiCall}>fetch</button>
//     </div>

//   );
// };

// export default HomePageContent;



import React, {useState} from 'react';
import PropTypes from 'prop-types';
//import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
 import { useDispatch, useSelector } from "react-redux";
 import { Link, useHistory } from "react-router-dom";
 import tileData from "./tileData";
import { setBackToComponent } from "../../store/header/actionCreator";
import PDFBookCover from "../../images/PDFBookCover.jpg";
import AudioBookCover from "../../images/Alice_in_Wonderland.jpg";
import GridListTile from "@material-ui/core/GridListTile";
import SimpleCard from "../HomePageContent/SimpleCard"
import HomePDFBooks from './HomePDFBooks';
import HomeAudioBooks from './HomeAudioBooks'
import PersonalDevelopment from '../PersonalDevelopment/PersonalDevelopment';
import axios from 'axios'
import { RoutedTabs, NavTab } from "react-router-tabs";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 2000,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
 
}));

export default function HomePageContent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [homePageBooks, setHomePageBooks] = useState([]);


  const apiCall = () => {
      axios.get('http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/home_page_books').then(
          res =>{
              setHomePageBooks(res.data)
              console.log(res.data)
          }
      )
  }
  const onImageClick1 = () => {
        console.log("onIMageClick1");
        dispatch(setBackToComponent("/personaldev/" + 1));
        history.push("/personaldev/" + 1);
      };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
      
          <Tab label="PDF Books" {...a11yProps(0)} />
         
          <Tab label="Audio Books" {...a11yProps(1)} />
       
          
           
        </Tabs>
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
        <TabPanel value={value} index={0} dir={theme.direction}>
       <HomePDFBooks/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} >
          <HomeAudioBooks />
        </TabPanel>
      {/* </SwipeableViews> */}
      
    </div>
  );
}
