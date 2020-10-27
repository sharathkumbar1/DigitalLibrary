import React, {useEffect, useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

import { signIn } from "../../store/signin/actionCreator";
import FormDialog from '../ModelWindow/ResetPassWord'
import {showNotificationError} from "../../store/notification/actionCreator";
import NotificationError from "../Notifications/NotificationError";

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
  const [allValues, setAllValues] = useState({
    email: '',
    password: '',
  });

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const signInPostResponse = useSelector(
      (state) => state.signInReducer.signInPostResponse
  );
  const signInPostErrResponse = useSelector(
      (state) => state.signInReducer.signInPostErrResponse
  );


  useEffect(() => {
    if (signInPostResponse) {
      handleRoute("")

    } else if (signInPostErrResponse) {
      console.log(signInPostErrResponse)
      dispatch(showNotificationError(true, signInPostErrResponse));

    }
  }, [signInPostResponse, signInPostErrResponse]);

  const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
  }

  const handleRoute = (route) => {
    props.history.push(`/${route}`);
  };

  const signInClicked = () => {

    // console.log(allValues);
    if (allValues.email === "") {
      dispatch(showNotificationError(true, "Please fill in Email"));
    }
    else if (allValues.password === "") {
      dispatch(showNotificationError(true, "Please fill in Password"));
    }
    else {
      dispatch(showNotificationError(false, ""));
      processRequest();
    }
  };

  const processRequest = () => {
    const requestBody = {
      email: allValues.email,
      password: allValues.password,
    };

    dispatch(signIn(requestBody));
  };

  const handleClickOpen = () => {
    console.log("FORGOT PASSWORD!!!!")
    setOpen(true)
  }

  const onCloseButtonClick = () => {
    setOpen(false)
  }

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
                            name="email"
                            variant="outlined"
                            required
                            autoFocus
                            onChange={changeHandler}
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
                            onChange={changeHandler}
                        />
                      </Grid>
                    </Grid>
                  </form>
                  <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                        onClick={signInClicked}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <Link
                      component="button"
                      variant="body2"
                      //onClick={() => handleRoute('forgotpw')}
                      onClick={handleClickOpen}
                  >
                    Forgot Password ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                      component="button"
                      variant="body2"
                      onClick={() => handleRoute('signup')}
                  >
                    New to Library?  Sign Up
                  </Link>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.notificationContainer}>
          <NotificationError />
        </div>

        <FormDialog
        open={open}
        onCloseButtonClick={onCloseButtonClick}
        >
          
        </FormDialog>
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
