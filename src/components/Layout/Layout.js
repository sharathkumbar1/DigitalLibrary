import React, { useState } from "react";
import Helmet from "react-helmet";
import { Route, Switch, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import AppHeader from "../Header/Header";

/* ROUTE COMPONENTS */
import HomePage from "./../HomePage/HomePage";
import SearchPage from "./../SearchPage/SearchPage";
import BrowsePage from "./../BrowsePage/BrowsePage";
import DisclaimerPage from "./../DisclaimerPage/DisclaimerPage";
import About from "../About/About";
import Sponsor from "../Sponsor/Sponsor";
import Faq from "../Faq/Faq";

const drawerWidth = 300;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing.unit,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.unit,
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuItem: {
    backgroundColor: "#333",
  },
  subMenuItem: {
    // marginLeft: 10,
  },
  whiteFont: {
    color: "#fff !important",
  },
});

const Layout = (props) => {
  const { classes } = props;
  const [openSideNav, setOpenSideNav] = useState(false);

  const handleDrawerOpen = () => {
    setOpenSideNav(true);
  };

  const handleDrawerClose = () => {
    setOpenSideNav(false);
  };

  const handleRoute = (route) => {
    props.history.push(`/${route}`);
    handleDrawerClose();
  };

  return (
    <div>
      <Helmet defaultTitle="Digital Library" titleTemplate="Digital Library" />
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: openSideNav,
          })}
        >
          <AppHeader
            handleDrawerOpen={() => handleDrawerOpen()}
            open={openSideNav}
            title="Digital Library"
          />
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={openSideNav}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => handleDrawerClose()}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <List>
            <ListItem button key={"Home"} className={classes.subMenuItem}>
              <ListItemText
                onClick={() => handleRoute("home")}
                primary={"Home"}
              />
            </ListItem>

            <ListItem button key={"Log-In"} className={classes.subMenuItem}>
              <ListItemText
                onClick={() => handleRoute("login")}
                primary={"Log-In"}
              />
            </ListItem>

            <ListItem button key={"Search"} className={classes.subMenuItem}>
              <ListItemText
                onClick={() => handleRoute("search")}
                primary={"Search"}
              />
            </ListItem>

            <ListItem button key={"Browse"} className={classes.subMenuItem}>
              <ListItemText
                onClick={() => handleRoute("browse")}
                primary={"Browse"}
              />
            </ListItem>

            <ListItem button key={"Disclaimer"} className={classes.subMenuItem}>
              <ListItemText
                onClick={() => handleRoute("disclaimer")}
                primary={"Disclaimer"}
              />
            </ListItem>

            <ListItem button key={"About"} className={classes.subMenuItem}>
              <ListItemText
                onClick={() => handleRoute("about")}
                primary={"About"}
              />
            </ListItem>

            <ListItem button key={"Sponsor"} className={classes.subMenuItem}>
              <ListItemText
                onClick={() => handleRoute("sponsor")}
                primary={"Sponsor"}
              />
            </ListItem>

            <ListItem button key={"FAQ"} className={classes.subMenuItem}>
              <ListItemText
                onClick={() => handleRoute("faq")}
                primary={"FAQ"}
              />
            </ListItem>
          </List>
        </Drawer>
        <div>
          <Grid container>
            <Grid item xs={12} style={{ marginTop: 60 }}>
              {/* routes */}
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/browse" component={BrowsePage} />
                <Route exact path="/disclaimer" component={DisclaimerPage} />
                <Route exact path="/about" component={About} />
                <Route exact path="/sponsor" component={Sponsor} />
                <Route exact path="/faq" component={Faq} />
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Layout);
