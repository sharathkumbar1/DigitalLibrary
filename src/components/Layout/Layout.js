import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import { Router, Route } from "react-router-dom";

/* ROUTE COMPONENTS */
import HomePageContent from "./../HomePageContent/HomePageContent";
import LogIn from "./../Login/LogIn";
import SignUp from "./../Login/SignUp";
import SearchPage from "./../SearchPage/SearchPage";
import BrowsePage from "./../BrowsePage/BrowsePage";
import AdminPage from "../AdminPage/AdminPage";
import About from "../About/About";
import Sponsor from "../Sponsor/Sponsor";
import Faq from "../Faq/Faq";
import ForgotPw from "./../Login/ForgotPw";
import AudioBook from "./../AudioBook/AudioBook";
import PersonalDevelopment from "../PersonalDevelopment/PersonalDevelopment"
import MobilePDFViewer from "../PDFViewer/MobilePDFViewer";
import UpdatePw from "../Login/UpdatePw";
import AccountVf from "../Login/AccountVf";
import RecentlyAdded from "../HomePageContent/RecentlyAdded"
import BookMarked from "../HomePageContent/BookMarked"
import RecentlyAddedAudio from "../HomePageContent/RecentlyAddedAudio"
import BookMarkedAudio from "../HomePageContent/BookMarkedAudio";
import RecentlyViewed from "../HomePageContent/RecentlyViewed"
import ViewedAudio from "../HomePageContent/ViewedAudio"
import Footer from "../../components/HomePageContent/Footer"
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";

const history = createBrowserHistory();
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
  const [drawer, setDrawer] = useState(false);

  // const toggleDrawer = () => {
  //   setDrawer(!drawer);
  // };

  // const onItemClick = (route) => () => {
  //   setDrawer(!drawer);
  // };

  const userdata = useSelector(state => state.signInReducer);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(userdata.signInPostResponse);
    if (userdata.signInPostResponse != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      //history.push('/')
    }
  }, [userdata])


  return (
      <div>
        <CssBaseline />
        <Router history={history}>
          <main>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/home" component={HomePageContent} />
            <Route exact path="/recently_added_books" component={RecentlyAdded} />
            <Route exact path="/book_marked_books" component={BookMarked} />
            <Route exact path="/recently_viewed_books" component={RecentlyViewed} />
            <Route exact path="/recently_added_audiobooks" component={RecentlyAddedAudio} />
            <Route exact path="/book_marked_audiobooks" component={BookMarkedAudio} />
            <Route exact path="/viewed_audiobooks" component={ViewedAudio} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgotpw" component={ForgotPw} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/browse" component={BrowsePage} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/about" component={About} />
            <Route exact path="/sponsor" component={Sponsor} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/audiobook/:file_name/:title" component={AudioBook} />
            <Route path="/personaldev" component={PersonalDevelopment} />
            <Route path="/pdfviewer" component={MobilePDFViewer} />
            <Route exact path="/updatepw" component={UpdatePw} />
            <Route exact path="/accountvf" component={AccountVf} />
          </main>
          {isLoggedIn && <Footer />}
        </Router>
      </div>
  );
};

export default withStyles(styles)(Layout);
