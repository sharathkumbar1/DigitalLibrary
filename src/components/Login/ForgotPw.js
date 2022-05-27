import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  showNotificationError,
  showNotificationSuccess,
} from "../../store/notification/actionCreator";
import { SUCCESS_ON_SAVE } from "../../constants/errorConstants";
import {
  forgotPw,
  handleForgotPwError,
  handleForgotPwSuccess,
} from "../../store/forgotpw/actionCreator";
import { Grid, Paper, Typography, withStyles } from "@material-ui/core";
import NotificationError from "../Notifications/NotificationError";
import NotificationSuccess from "../Notifications/NotificationSuccess";

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },

  signupForm: {
    justifyContent: "center",
    minHeight: "90vh",
  },

  signupBackground: {
    padding: "20px",
    minHeight: "62vh",
    maxWidth: "50vh",
    justifyContent: "center",
  },
  genderRadioGroup: {
    display: "block",
  },
  notificationContainer: {
    position: "relative",
  },
  buttonBlock: {
    // marginTop: "40px",
    margin: "auto",
    paddingTop: "30px",
  },
  buttonLeft: {
    marginLeft: "50px",
  },
  buttonRight: {
    marginLeft: "10px",
  },
});

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  termsAndConditions: false,
};

const ForgotPw = (props) => {
  const { classes } = props;

  //const { open, onCloseButtonClick } = props;
  const [userEmail, setUserEmail] = React.useState("");
  const changeHandler = (e) => {
    setUserEmail(e.target.value);
  };
  const dispatch = useDispatch();
  const forgotPwPostResponse = useSelector(
    (state) => state.forgotPwReducer.forgotPwPostResponse
  );
  const forgotPwPostErrResponse = useSelector(
    (state) => state.forgotPwReducer.forgotPwPostErrResponse
  );

  const resetReduxStoreAndHideNotifications = () => {
    console.log("resetting");
    dispatch(handleForgotPwSuccess({ data: null }));
    dispatch(handleForgotPwError(null));
    dispatch(showNotificationError(false, ""));
    dispatch(showNotificationSuccess(false, ""));
  };

  useEffect(() => {
    console.log(forgotPwPostResponse);
    console.log(forgotPwPostErrResponse);
    if (forgotPwPostResponse) {
      dispatch(showNotificationError(true, SUCCESS_ON_SAVE));
    } else if (forgotPwPostErrResponse) {
      console.log(forgotPwPostErrResponse);
      dispatch(showNotificationError(true, forgotPwPostErrResponse));
    }
  }, [forgotPwPostResponse, forgotPwPostErrResponse]);

  const pwprocessRequest = () => {
    const pwrequestBody = {
      email: userEmail,
    };
    dispatch(forgotPw(pwrequestBody));
    ///onCloseButtonClick()
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const onResetButtonClick = () => {
    console.log("reset email" + userEmail);
    if (userEmail === "") {
      dispatch(showNotificationError(true, "Please enter the email ", "reset"));
    } else if (validateEmail(userEmail) === false) {
      dispatch(
        showNotificationError(true, "email format is not valid", "reset")
      );
    } else {
      //dispatch(showNotificationError(false, ""));
      pwprocessRequest();
    }
  };

  const handleRoute = (route) => {
    props.history.push(`/${route}`);
  };

  const onCloseButtonClick = () => {
    ///setOpen(false)
    handleRoute("");
  };

  return (
    <div>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className={classes.signupForm}
          >
            <Paper
              variant="elevation"
              elevation={2}
              className={classes.signupBackground}
            >
              <Grid item>
                <Typography variant="h6">
                  Enter your email address and we will send you an email to
                  reset your password
                </Typography>
              </Grid>
              <Grid item>
                <form>
                  <Grid container direction="column" spacing={1}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      id="resetEmailFormat"
                      type="email"
                      onChange={changeHandler}
                      fullWidth
                    />
                  </Grid>

                  <Grid
                    item
                    className={classes.buttonBlock}
                    justify="center"
                    direction="flex"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttonLeft}
                      onClick={() => onCloseButtonClick()}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttonRight}
                      onClick={() => onResetButtonClick()}
                    >
                      Reset
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.notificationContainer}>
        <NotificationError
          resetReduxStoreAndHideNotifications={
            resetReduxStoreAndHideNotifications
          }
        />
        <NotificationSuccess
          resetReduxStoreAndHideNotifications={
            resetReduxStoreAndHideNotifications
          }
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(ForgotPw);
