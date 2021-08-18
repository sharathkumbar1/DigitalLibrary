// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
// import HomeIcon from '@material-ui/icons/Home';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import { useHistory } from "react-router-dom";
// import {  useSelector } from 'react-redux'
// import isEmpty from 'lodash'

// const useStyles = makeStyles((theme) => ({
//   root: {
//         width: 400,
//       },
//   appBar: {
//     top: 'auto',
//     bottom: 0,
//   },
//   grow: {
//     flexGrow: 1,
//     padding: '6px 30px 6px 30px',
//   },
//   grow1: {
//     flexGrow: 1,
//     padding: '6px 30px 6px 30px',
//   },
//   grow2: {
//     flexGrow: 1,
//     padding: '6px 30px 6px 30px',
//   },
// }));

// export default function Footer() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);
//   let history = useHistory();
//   const [admin, setAdmin]= useState('')

//   const handleRoute = (route) => {
//     history.push(`${route}`);
//   };

//   const toHomePage = () => {
//     handleRoute("/home")
//   }

//   const signInPostResponse = useSelector(
//     (state) => state.signInReducer.signInPostResponse
// );

// useEffect(() => {
//   if(signInPostResponse){
//     console.log(signInPostResponse)
//     const {isAdmin} = signInPostResponse
//     setAdmin(isAdmin)
//   }

// }, [signInPostResponse])

//   return (
//     <React.Fragment>

//       <CssBaseline />
//       <AppBar position="fixed" color="primary" className={classes.appBar} showlabels>
//         <Toolbar>
//           <IconButton  color="inherit" aria-label="open drawer" href="/home">
//             <HomeIcon />
//           </IconButton>
//           <div className={classes.grow}/>
//           <IconButton color="inherit" href="/search">
//             <SearchIcon />
//           </IconButton>
//           <div className={classes.grow1}/>
//           <IconButton  color="inherit">
//             <BookmarkIcon />
//           </IconButton>
//           {!admin ?  <div className={classes.grow2}>
//           <IconButton  color="inherit" href="/admin">
//             <AccountCircleIcon />
//           </IconButton>
//           </div> : ''}

//         </Toolbar>
//       </AppBar>
//     </React.Fragment>
//   );
// }

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
    padding: "6px 30px 6px 30px",
  },
  grow1: {
    flexGrow: 1,
    padding: "6px 30px 6px 30px",
  },
  grow2: {
    flexGrow: 1,
    padding: "6px 30px 6px 30px",
  },
  phantom: {
    display: "block",
    padding: "20px",
    height: "60px",
    width: "100%",
  },
}));

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const [admin, setAdmin] = useState("");

  const handleBottomMenuItemClick = (page) => {
    history.push(page);
  };

  const signInPostResponse = useSelector(
    (state) => state.signInReducer.signInPostResponse
  );

  useEffect(() => {
    if (signInPostResponse) {
      console.log(signInPostResponse);
      const { isAdmin } = signInPostResponse;
      setAdmin(isAdmin);
    }
  }, [signInPostResponse]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.phantom} />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="home"
            onClick={() => handleBottomMenuItemClick("/home")}
          >
            <HomeIcon />
          </IconButton>
          <div className={classes.grow} />
          <IconButton
            color="inherit"
            aria-label="search"
            onClick={() => handleBottomMenuItemClick("/search")}
          >
            <SearchIcon />
          </IconButton>
          <div className={classes.grow1} />
          <IconButton
            color="inherit"
            aria-label="book marked books"
            onClick={() => handleBottomMenuItemClick("/book_marked_books")}
          >
            <BookmarkIcon />
          </IconButton>
          {admin ? (
            <div className={classes.grow2}>
              <IconButton
                color="inherit"
                aria-label="admin"
                onClick={() => handleBottomMenuItemClick("/admin")}
              >
                <AccountCircleIcon />
              </IconButton>
            </div>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
