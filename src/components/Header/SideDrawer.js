import React from "react";
import { Router, Route, Link } from "react-router-dom";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { createBrowserHistory } from "history";

/* ROUTE COMPONENTS */
import HomePage from "./../HomePage/HomePage";
import LogInOrSignUp from "./../Login/LogInOrSignUp";
import LogIn from "./../Login/LogIn";
import SignUp from "./../Login/SignUp";
import SearchPage from "./../SearchPage/SearchPage";
import BrowsePage from "./../BrowsePage/BrowsePage";
import DisclaimerPage from "./../DisclaimerPage/DisclaimerPage";
import About from "../About/About";
import Sponsor from "../Sponsor/Sponsor";
import Faq from "../Faq/Faq";
import ForgotPw from "./../Login/ForgotPw";
import AudioBook from "./../AudioBook/AudioBook";
import PersonalDevelopment from "../PersonalDevelopment/PersonalDevelopment"

const history = createBrowserHistory();

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
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const SideDrawer = (props) => {
  const { classes, variant, open, onClose, onItemClick } = props;
  return (
    <Router history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent",
          })}
        />
        <List>
          <ListItem
            button
            key={"Home"}
            component={Link}
            to="/"
            onClick={onItemClick("home")}
          >
            <ListItemText>Home</ListItemText>
          </ListItem>

          <ListItem
            button
            key={"Log-In"}
            component={Link}
            to="/login"
            onClick={onItemClick("login")}
            //onClick={() => props.onItemClick("login")}
          >
            <ListItemText>Log-In</ListItemText>
          </ListItem>

          <ListItem
            button
            key={"Search"}
            component={Link}
            to="/search"
            onClick={() => onItemClick("search")}
          >
            <ListItemText>Search</ListItemText>
          </ListItem>

          <ListItem
            button
            key={"Browse"}
            component={Link}
            to="/browse"
            onClick={() => onItemClick("browse")}
          >
            <ListItemText>Browse</ListItemText>
          </ListItem>

          <ListItem
            button
            key={"Disclaimer"}
            component={Link}
            to="/disclaimer"
            onClick={() => onItemClick("disclaimer")}
          >
            <ListItemText>Disclaimer</ListItemText>
          </ListItem>

          <ListItem
            button
            key={"About"}
            component={Link}
            to="/about"
            onClick={() => onItemClick("about")}
          >
            <ListItemText>About</ListItemText>
          </ListItem>

          <ListItem
            button
            key={"Sponsor"}
            component={Link}
            to="/sponsor"
            onClick={() => onItemClick("sponsor")}
          >
            <ListItemText>Sponsor</ListItemText>
          </ListItem>

          <ListItem
            button
            key={"FAQ"}
            component={Link}
            to="/faq"
            onClick={() => onItemClick("faq")}
          >
            <ListItemText>FAQ</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {/* <Route exact path="/" component={LogInOrSignUp} /> */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgotpw" component={ForgotPw} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/browse" component={BrowsePage} />
        <Route exact path="/disclaimer" component={DisclaimerPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/sponsor" component={Sponsor} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/audiobook" component={AudioBook} />
        <Route path="/personaldev" component={PersonalDevelopment} />
        {/* <Route component={NotFound} /> */}
      </main>
    </Router>
  );
};

export default withStyles(styles)(SideDrawer);

//export default SideDrawer;
