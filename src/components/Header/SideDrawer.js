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
import HomePageContent from "./../HomePageContent/HomePageContent";
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
import PDFViewer from "../PDFViewer/PDFViewer";
import UpdatePw from "../Login/UpdatePw";
import AccountVf from "../Login/AccountVf";
import RecentlyAdded from "../HomePageContent/RecentlyAdded"
import BookMarked from "../HomePageContent/BookMarked"
import RecentlyAddedAudio from "../HomePageContent/RecentlyAddedAudio"
import BookMarkedAudio from "../HomePageContent/BookMarkedAudio";
import RecentlyViewed from "../HomePageContent/RecentlyViewed"
import ViewedAudio from "../HomePageContent/ViewedAudio"



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
            to="/home"
            onClick={onItemClick("home")}
          >
            <ListItemText>Home</ListItemText>
          </ListItem>

          <ListItem
            button
            key={"Log-In"}
            component={Link}
            to="/"
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
        <Route exact path="/home" component={HomePageContent} />
        <Route exact path="/recently_added_books" component={RecentlyAdded}/>
        <Route exact path="/book_marked_books" component={BookMarked} />
        <Route exact path="/recently_viewed_books" component={RecentlyViewed} />
        <Route exact path="/recently_added_audiobooks" component={RecentlyAddedAudio}/>
        <Route exact path="/book_marked_audiobooks" component={BookMarkedAudio}/>
        <Route exact path="/viewed_audiobooks" component={ViewedAudio}/>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgotpw" component={ForgotPw} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/browse" component={BrowsePage} />
        <Route exact path="/disclaimer" component={DisclaimerPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/sponsor" component={Sponsor} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/audiobook/:file_name/:title" component={AudioBook} />
        <Route path="/personaldev" component={PersonalDevelopment} />
        <Route path="/pdfviewer" component={PDFViewer} />
        <Route exact path="/updatepw" component={UpdatePw} />
        <Route exact path="/accountvf" component={AccountVf} />
        {/* <Route component={NotFound} /> */}
      </main>
    </Router>
  );
};

export default withStyles(styles)(SideDrawer);

//export default SideDrawer;
