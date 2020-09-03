import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppImage from "../AppImage/AppImage";
import HomePageContent from "../HomePageContent/HomePageContent";

const styles = (theme) => ({
  homePage: {
    textAlign: "center",
  },
  homePageIntro: {
    fontSize: "large",
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const HomePage = () => {
  return (
    <div>
      <AppImage />
      <HomePageContent />
    </div>
  );
};

export default withStyles(styles)(HomePage);
