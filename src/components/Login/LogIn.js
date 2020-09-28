import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },

  loginForm: {
    justifyContent: "center",
    minHeight: "90vh",
  },

  loginBackground: {
    justifyContent: "center",
    minHeight: "30vh",
    padding: "50px",
  },
});

const LogIn = (props) => {
  const { classes } = props;
  const handleRoute = (route) => {
    props.history.push(`/${route}`);
  };

  // const { active, updateWindow } = props
  // if (active === true) {
  return (
    <div>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className={classes.loginForm}
          >
            <Paper
              variant="elevation"
              elevation={2}
              className={classes.loginBackground}
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form >
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="username"
                        variant="outlined"
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  New to Library?  Sign Up
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>

    // <div>
    //     Sign In
    //     <div>
    //         <TextField id="email" label="Email" variant="outlined"/>
    //     </div>
    //     <div>
    //         <TextField id="password" label="Password" variant="outlined"/>
    //     </div>
    //     <div>
    //         <Button variant="contained">Sign In</Button>
    //     </div>
    //     <div>
    //         <Link
    //             component="button"
    //             variant="body2"
    //             onClick={() => {
    //                 console.info("Forgot Password?");
    //             }}
    //         >
    //             Forgot Password?
    //         </Link>
    //     </div>
    //     <div>
    //         <Link
    //             component="button"
    //             variant="body2"
    //             // onClick={() => updateWindow('SIGNUP')}
    //             onClick={() => handleRoute('signup')}

    //         >
    //             New to Library? Sign Up
    //         </Link>
    //     </div>
    // </div>
  );
  // } else
  //     return null
};

export default withStyles(styles)(LogIn);
