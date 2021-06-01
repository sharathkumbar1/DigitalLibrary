/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect } from "react";
import { object, string, func } from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setBackToComponent } from "../../store/header/actionCreator";
import { useHistory } from 'react-router-dom'

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  backButton: {
    color: "#FFFFFF",
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const Header = (props) => {
  const { classes, title, onMenuClick } = props;
  const dispatch = useDispatch();
  const history = useHistory()
  const backToComponentResponse = useSelector(
    (state) => state.headerReducer.backToComponent
  );

  const onBackBtnClicked = () => {
    history.goBack()
    const locPath = window.location.href;
    if(locPath.indexOf("personaldev") == -1 ){
      //Do nothing
    }else {
      dispatch(setBackToComponent(""))
    }
  }

  const handleHeaderButton = () => {
    if(backToComponentResponse){
      return (
        <Link to="/personaldev/1" style={{ textDecoration: "none" }} className={classes.link}>
          <IconButton
            className={classes.backButton}
            aria-label="Back"
            data-cy="backBtn"
            onClick={onBackBtnClicked}
          >
            <ArrowBack />
          </IconButton>
        </Link>
      );
    }else {
      return (
        <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
      )
    }
    
  };
  return (
    <Fragment>
      <AppBar className={classes.aboveDrawer}>
        <Toolbar>
          {handleHeaderButton()}
          <Typography variant="h6" color="inherit" className={classes.flex}>
            {title}
          </Typography> 
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

Header.displayName = "Header";

Header.propTypes = {
  classes: object,
  title: string.isRequired,
  menuAction: func,
};

Header.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Header);
