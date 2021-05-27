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

import {SUCCESS_ON_ACCOUNT_VERIFY} from "../../constants/errorConstants";

import {showNotificationError, showNotificationSuccess,} from "../../store/notification/actionCreator";
import {accountVf, handleAccountVfError, handleAccountVfSuccess} from "../../store/accountvf/actionCreator";

import NotificationSuccess from "../Notifications/NotificationSuccess";
import NotificationError from "../Notifications/NotificationError";

const styles = (theme) => ({
    button: {
        margin: theme.spacing.unit,
    },

    accountvfForm: {
        justifyContent: "center",
        minHeight: "90vh",
    },

    accountvfBackground: {
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

const AccountVf = (props) => {
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
    const accountVfPostResponse = useSelector(
        (state) => state.accountVfReducer.accountVfPostResponse
    );
    const accountVfPostErrResponse = useSelector(
        (state) => state.accountVfReducer.accountVfPostErrResponse
    );

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('token');
    console.log("here is the token captured");
    console.log(myParam);

    const resetReduxStoreAndHideNotifications = () => {
        console.log("resetting")
        dispatch(handleAccountVfSuccess({data: null}))
        dispatch(handleAccountVfError(null))
        dispatch(showNotificationError(false, ""));
        dispatch(showNotificationSuccess(false, ""));
    }

    useEffect(() => {
        dispatch(showNotificationError(false, ""));
        processRequest();
    }, []);

    useEffect(() => {
        if (accountVfPostResponse) {
            // dispatch(showNotificationSuccess(true, SUCCESS_ON_ACCOUNT_VERIFY));
            props.history.push('/search')
        } else if (accountVfPostErrResponse) {
            console.log(accountVfPostErrResponse)
            dispatch(showNotificationError(true, accountVfPostErrResponse));
        }
    }, [accountVfPostResponse, accountVfPostErrResponse]);

    const gotoSignIn = () => {
        resetReduxStoreAndHideNotifications()
        props.history.push('/');
    };

    const accountVfClicked = () => {

        // console.log(termsAndConditions)
        // if (password === "") {
        //     dispatch(showNotificationError(true, "Please fill in Password"));
        // }
        // else if (password !== confirmPassword) {
        //     dispatch(showNotificationError(true, "Confirm password is not same as password"));
        // }
        // else {
            // dispatch(showNotificationError(false, ""));
            dispatch(showNotificationSuccess(true, SUCCESS_ON_ACCOUNT_VERIFY));
            processRequest();
       // }
    };

    const processRequest = () => {
        const requestBody = {
            password: password,
        };
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');

        const requestConfigToken = {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
        };


        dispatch(accountVf(tokenParam,requestConfigToken));
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
                        className={classes.accountvfForm}
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            className={classes.accountvfBackground}
                        >
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Account Verification
                                </Typography>
                            </Grid>
                            <Grid item>
                                {/*<form>*/}
                                {/*    <Grid container direction="column" spacing={2}>*/}
                                {/*        <Grid item>*/}
                                {/*            <TextField*/}
                                {/*                type="password"*/}
                                {/*                placeholder="Password"*/}
                                {/*                fullWidth*/}
                                {/*                name="password"*/}
                                {/*                variant="outlined"*/}
                                {/*                required*/}
                                {/*                value={password}*/}
                                {/*                onChange={changeHandler}*/}
                                {/*            />*/}
                                {/*        </Grid>*/}
                                {/*        <Grid item>*/}
                                {/*            <TextField*/}
                                {/*                type="password"*/}
                                {/*                placeholder="Confirm Password"*/}
                                {/*                fullWidth*/}
                                {/*                name="confirmPassword"*/}
                                {/*                variant="outlined"*/}
                                {/*                required*/}
                                {/*                value={confirmPassword}*/}
                                {/*                onChange={changeHandler}*/}
                                {/*            />*/}
                                {/*        </Grid>*/}
                                {/*    </Grid>*/}
                                {/*</form>*/}
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className="button-block"
                                        onClick={() => accountVfClicked()}
                                    >
                                        Verify
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
                                    Dont want to verify? Sign In
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

export default withStyles(styles)(AccountVf);
