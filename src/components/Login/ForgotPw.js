import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

import { forgotPw } from "../../store/forgotpw/actionCreator";

const styles = (theme) => ({
    button: {
        margin: theme.spacing.unit,
    },

    forgotpwForm: {
        justifyContent: "center",
        minHeight: "90vh",
    },

    forgotpwBackground: {
        padding: "20px",
        minHeight: "62vh",
        maxWidth: "50vh",
        justifyContent: "center",
    },
    genderRadioGroup: {
        display: "block",
    },
});

const ForgotPw = (props) => {

    const [allValues, setAllValues] = useState({
        email: '',
    });

    const changeHandler = e => {
        // console.log(e)
        // console.log(e.target)
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    const { classes } = props;

    const dispatch = useDispatch();
    const forgotPwPostResponse = useSelector(
        (state) => state.forgotPwReducer.forgotPwPostResponse
    );
    const forgotPwPostErrResponse = useSelector(
        (state) => state.forgotPwReducer.forgotPwPostErrResponse
    );

    useEffect(() => {
        if (forgotPwPostResponse) {
            console.log("--------------SUCCESS MESSAGE------------");
        } else if (forgotPwPostErrResponse) {
            console.log("--------------ERROR MESSAGE------------");
        }
    }, [forgotPwPostResponse, forgotPwPostErrResponse]);

    //
    const handleRoute = (route) => {
        props.history.push(`/${route}`);
    };

    //
    const forgotPwClicked = () => {

        // console.log(allValues);
        if (allValues.email !== '') {
            processRequest();
        }
    };

    //
    const processRequest = () => {
        const requestBody = {
            emailAddress: allValues.email,
        };

        dispatch(forgotPw(requestBody));
        handleRoute("login")
    };

    // const updateFirstName = (value) => {
    //
    // }

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
                        classname={classes.forgotpwForm}
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            className={classes.forgotpwBackground}
                        >
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Forgot Password
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form>
                                    <Grid container direction="column" spacing={1}>
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
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className="button-block"
                                                onClick={() => forgotPwClicked()}
                                            >
                                                Reset Password
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
    // } else
    //     return null
};

export default withStyles(styles)(ForgotPw);
