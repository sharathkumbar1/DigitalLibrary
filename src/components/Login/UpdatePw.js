import React, {useEffect, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import {
    Button,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";

import {useDispatch, useSelector} from "react-redux";

import {SUCCESS_ON_RESET} from "../../constants/errorConstants";

import {showNotificationError, showNotificationSuccess,} from "../../store/notification/actionCreator";
import {updatePw, handleUpdatePwError, handleUpdatePwSuccess} from "../../store/updatepw/actionCreator";

import NotificationSuccess from "../Notifications/NotificationSuccess";
import NotificationError from "../Notifications/NotificationError";

const styles = (theme) => ({
    button: {
        margin: theme.spacing.unit,
    },

    updatepwForm: {
        justifyContent: "center",
        minHeight: "90vh",
    },

    updatepwBackground: {
        padding: "50px",
        minHeight: "30vh",
        justifyContent: "center",
    },
    notificationContainer: {
        position: "relative",
    },
});

const initialState = {
    password: "",
    confirmPassword: "",
};

const UpdatePw = (props) => {
    const [
        { password, confirmPassword },
        setState,
    ] = useState(initialState);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const { classes } = props;

    const dispatch = useDispatch();
    const updatePwPostResponse = useSelector(
        (state) => state.updatePwReducer.updatePwPostResponse
    );
    const updatePwPostErrResponse = useSelector(
        (state) => state.updatePwReducer.updatePwPostErrResponse
    );

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('token');
    console.log("here is the token captured");
    console.log(myParam);

    const resetReduxStoreAndHideNotifications = () => {
        console.log("resetting")
        dispatch(handleUpdatePwSuccess({data: null}))
        dispatch(handleUpdatePwError(null))
        dispatch(showNotificationError(false, ""));
        dispatch(showNotificationSuccess(false, ""));
    }

    useEffect(() => {
        if (updatePwPostResponse) {
            dispatch(showNotificationSuccess(true, SUCCESS_ON_RESET));
        } else if (updatePwPostErrResponse) {
            console.log(updatePwPostErrResponse)
            dispatch(showNotificationError(true, updatePwPostErrResponse));
        }
    }, [updatePwPostResponse, updatePwPostErrResponse]);

    const gotoSignIn = () => {
        resetReduxStoreAndHideNotifications()
        props.history.push('/');
    };

    const updatePwClicked = () => {

        // console.log(termsAndConditions)
         if (password === "") {
            dispatch(showNotificationError(true, "Please fill in Password"));
        }
        else if (password !== confirmPassword) {
            dispatch(showNotificationError(true, "Confirm password is not same as password"));
        }
        else {
            dispatch(showNotificationError(false, ""));
            processRequest();
        }
    };

    const processRequest = () => {
        const requestBody = {
            password: password,
        };
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('token');

        const requestConfigToken = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Token": myParam,
            },
        };


        dispatch(updatePw(requestBody,requestConfigToken));
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
                        className={classes.updatepwForm}
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            className={classes.updatepwBackground}
                        >
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Reset password
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form>
                                    <Grid container direction="column" spacing={2}>
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
                                    </Grid>
                                </form>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className="button-block"
                                        onClick={() => updatePwClicked()}
                                    >
                                        Reset
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
                                    Dont want reset password? Sign In
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

export default withStyles(styles)(UpdatePw);
