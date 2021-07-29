import React, {useEffect, useState, useRef} from "react";
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
import { signIn, handleSignInError, handleSignInSuccess } from "../../store/signin/actionCreator";
import FormDialog from '../ModelWindow/ResetPassWord'
import {showNotificationError} from "../../store/notification/actionCreator";
import NotificationError from "../Notifications/NotificationError";
import NotificationSuccess from "../Notifications/NotificationSuccess";

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
  paddingTop: {
    paddingTop: "10px",
  }
});

const LogIn = (props) => {

  const signInFocus = useRef();
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
    console.log("testtt ", signInPostResponse)
    console.log("testtt111 ", signInPostErrResponse)
    
  
    if (signInPostResponse) {
      handleRoute("home")

    } else if (signInPostErrResponse) {
      signInFocus.current.focus();
      console.log("ccc ", signInPostErrResponse)

      dispatch(showNotificationError(true, signInPostErrResponse, "login"));
    } else if (signInPostErrResponse === undefined) {
      console.log("2222222")
      dispatch(showNotificationError(true, "Invalid Email ID or Password", "login"));
    }

  }, [signInPostResponse, signInPostErrResponse]);

  const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
  }

  const handleRoute = (route) => {
    props.history.push(`/${route}`);
  };

  const resetReduxStoreAndHideNotifications = () => {
    dispatch(handleSignInSuccess(null))
    dispatch(handleSignInError(null))
    dispatch(showNotificationError(false, "", "login"));
  }

  const gotoSignUp = () => {
    resetReduxStoreAndHideNotifications()
    handleRoute("signup")
  }

  const signInClicked = () => {
    
    if (allValues.email === "") {
      console.log("10101010")
     // document.getElementById("notificationCloseBtn").focus();
      dispatch(showNotificationError(true, "Please fill in Email", "login"));
      //signInFocus.current.focus();
//document.getElementById("notificationCloseBtn").focus();
      
    }
    else if (allValues.password === "") {
      console.log("1111111")
      dispatch(showNotificationError(true, "Please fill in Password", "login"));
    }
    else {
      // dispatch(showNotificationError(false, ""));
      resetReduxStoreAndHideNotifications()
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
    resetReduxStoreAndHideNotifications()
    setOpen(true)
  }

  const onCloseButtonClick = () => {
    console.log("ccccc")
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
                  <Typography  component="h1" variant="h5"  className={classes.paddingTop} aria-label="This is the sign in form. It contains sign in, forget password and sign up section">
                    Sign in
                  </Typography>
                </Grid>
                <Grid item>
                  <form >
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                            className={classes.paddingTop}
                            //ref={signInFocus}
                            type="email"
                            placeholder="Email"
                            fullWidth
                            name="email"
                            id="email"
                            variant="outlined"
                            required
                            onChange={changeHandler}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            className={classes.paddingTop}
                            type="password"
                            placeholder="Password"
                            fullWidth
                            name="password"
                            id="password"
                            variant="outlined"
                            required
                            onChange={changeHandler}
                        />
                      </Grid>
                    </Grid>
                  </form>
                  <Grid item className={classes.paddingTop}>
                    <Button
                        
                        className={classes.paddingTop}
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                        onClick={() => signInClicked()}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <Link
                      className={classes.paddingTop}
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
                      className={classes.paddingTop}
                      component="button"
                      variant="body2"
                      onClick={() => gotoSignUp()}
                  >
                    New to Library?  Sign Up
                  </Link>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.notificationContainer}>
          <NotificationError resetReduxStoreAndHideNotifications={resetReduxStoreAndHideNotifications}/>
          <NotificationSuccess resetRsignInFocuseduxStoreAndHideNotifications={resetReduxStoreAndHideNotifications} />
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
