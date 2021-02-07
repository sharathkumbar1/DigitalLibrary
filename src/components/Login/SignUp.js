import React, {useEffect, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@material-ui/core";

import {useDispatch, useSelector} from "react-redux";

import {SUCCESS_ON_SAVE} from "../../constants/errorConstants";

import {showNotificationError, showNotificationSuccess,} from "../../store/notification/actionCreator";
import {signUp, handleSignUpError, handleSignUpSuccess} from "../../store/signup/actionCreator";

import NotificationSuccess from "../Notifications/NotificationSuccess";
import NotificationError from "../Notifications/NotificationError";

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

const SignUp = (props) => {
  const [
    { firstname, lastname, email, password, gender, confirmPassword, termsAndConditions },
    setState,
  ] = useState(initialState);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleTermsAndConditions = (e) => {
    setState((prevState) => ({ ...prevState, 'termsAndConditions': !termsAndConditions }));
  };

  const { classes } = props;

  const dispatch = useDispatch();
  const signUpPostResponse = useSelector(
    (state) => state.signUpReducer.signUpPostResponse
  );
  const signUpPostErrResponse = useSelector(
    (state) => state.signUpReducer.signUpPostErrResponse
  );

  const resetReduxStoreAndHideNotifications = () => {
    console.log("resetting")
    dispatch(handleSignUpSuccess({data: null}))
    dispatch(handleSignUpError(null))
    dispatch(showNotificationError(false, ""));
    dispatch(showNotificationSuccess(false, ""));
  }

  useEffect(() => {
    if (signUpPostResponse) {
      dispatch(showNotificationSuccess(true, SUCCESS_ON_SAVE));
    } else if (signUpPostErrResponse) {
      console.log(signUpPostErrResponse)
      dispatch(showNotificationError(true, signUpPostErrResponse));
    }
  }, [signUpPostResponse, signUpPostErrResponse]);

  const gotoSignIn = () => {
    resetReduxStoreAndHideNotifications()
    props.history.push('/login');
  };

  const signUpClicked = () => {
    // console.log(termsAndConditions)
    if (firstname === "") {
      dispatch(showNotificationError(true, "Please fill in First Name"));
    }
    else if (lastname === "") {
      dispatch(showNotificationError(true, "Please fill in Last Name"));
    }
    else if (email === "") {
      dispatch(showNotificationError(true, "Please fill in Email"));
    }
    else if (password === "") {
      dispatch(showNotificationError(true, "Please fill in Password"));
    }
    else if (password !== confirmPassword) {
      dispatch(showNotificationError(true, "Confirm password is not same as password"));
    }
    else if (gender !== "M" && gender !== "F") {
      dispatch(showNotificationError(true, "Please select gender"));
    }
    else if (!termsAndConditions) {
      dispatch(showNotificationError(true, "Please accept Samarthanam Terms & Conditions"));
    }
    else {
      dispatch(showNotificationError(false, ""));
      processRequest();
    }
  };

  const processRequest = () => {
    const requestBody = {
      first_name: firstname,
      last_name: lastname,
      email_address: email,
      password: password,
      gender: gender,
    };

    dispatch(signUp(requestBody));
    setState({ ...initialState });
    
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
            className={classes.signupForm}
          >
            <Paper
              variant="elevation"
              elevation={2}
              className={classes.signupBackground}
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Create your account
                </Typography>
              </Grid>
              <Grid item>
                <form>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <TextField
                        type="name"
                        placeholder="First Name"
                        fullWidth
                        name="firstname"
                        variant="outlined"
                        required
                        autoFocus
                        value={firstname}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="name"
                        placeholder="Last Name"
                        fullWidth
                        name="lastname"
                        variant="outlined"
                        required
                        value={lastname}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="email"
                        variant="outlined"
                        required
                        value={email}
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
                        value={password}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Confirm Password"
                        fullWidth
                        name="confirmPassword"
                        variant="outlined"
                        required
                        value={confirmPassword}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label="gender"
                        name="gender"
                        className={classes.genderRadioGroup}
                        onChange={changeHandler}
                      >
                        <FormControlLabel
                          value="F"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="M"
                          control={<Radio />}
                          label="Male"
                        />
                      </RadioGroup>
                    </Grid>
                    <Grid item>
                      <Checkbox
                        style={{ padding: "9px 9px 9px 0px" }}
                        name="termsAndConditions"
                        size="small"
                        inputProps={{
                          "aria-label": "checkbox with small size",
                        }}
                        onChange={toggleTermsAndConditions}
                        checked={termsAndConditions}
                      />
                      I agree to Samarthanam {}
                      <Link
                        href="https://www.samarthanam.org/terms-conditions/"
                        color="inherit"
                      >
                        Terms & Conditions
                      </Link>
                    </Grid>
                  </Grid>
                </form>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="button-block"
                    onClick={() => signUpClicked()}
                    >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  // onClick={() => updateWindow('LOGIN')}
                  onClick={() => gotoSignIn()}
                >
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.notificationContainer}>
        <NotificationError resetReduxStoreAndHideNotifications={resetReduxStoreAndHideNotifications} />
        <NotificationSuccess resetReduxStoreAndHideNotifications={resetReduxStoreAndHideNotifications} />
      </div>
    </div>
  );
};

export default withStyles(styles)(SignUp);
