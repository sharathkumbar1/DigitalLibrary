import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from '@material-ui/core'

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

const LogInOrSignUp = () => {
  return (
    <div>
        <div>
        <Link
            component="button"
            variant="body2"
            onClick={() => {
                console.info("Sign Up with Email");
            }}
        >
            Sign up with Email
        </Link>
        </div>
        <div>
        <Link
            component="button"
            variant="body2"
            onClick={() => {
                console.info("Sign Up with Email");
            }}
        >
            Already have an account? Sign in
        </Link>
        </div>
    </div>
  );
};

export default withStyles(styles)(LogInOrSignUp);
