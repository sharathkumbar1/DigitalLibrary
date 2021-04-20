import React, { useState } from "react";
import Helmet from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import AppHeader from "../Header/Header";
import SideDrawer from "../Header/SideDrawer";

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
  const { variant } = props;
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = (route) => () => {
    setDrawer(!drawer);
  };

  return (
    <div>
      {/* <Helmet defaultTitle="Digital Library" titleTemplate="Digital Library" /> */}
      <div>
        <CssBaseline />

        <AppHeader onMenuClick={() => toggleDrawer()} title="Digital Library" />

        <SideDrawer
          open={drawer}
          onClose={() => toggleDrawer()}
          onItemClick={onItemClick}
          variant={variant}
        ></SideDrawer>
      </div>
    </div>
  );
};

export default withStyles(styles)(Layout);
