import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
    padding: '6px 30px 6px 30px',
  },
  grow1: {
    flexGrow: 1,
    padding: '6px 30px 6px 30px',
  },
  grow2: {
    flexGrow: 1,
    padding: '6px 30px 6px 30px',
  },
}));

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory()

  const handleBottomMenuItemClick = page => {
    history.push(page)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={() => handleBottomMenuItemClick('/home')} >
            <HomeIcon />
          </IconButton>
          <div className={classes.grow} />
          <IconButton color="inherit" onClick={() => handleBottomMenuItemClick('/search')}>
            <SearchIcon />
          </IconButton>
          <div className={classes.grow1} />
          <IconButton color="inherit" onClick={() => handleBottomMenuItemClick('/book_marked_books')} >
            <BookmarkIcon />
          </IconButton>
          <div className={classes.grow2} />
          <IconButton color="inherit" onClick={() => handleBottomMenuItemClick('/')}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}