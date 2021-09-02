import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { showNotificationError, showNotificationSuccess, } from "../../store/notification/actionCreator";
import { SUCCESS_ON_SAVE } from "../../constants/errorConstants";
import { forgotPw, handleForgotPwError, handleForgotPwSuccess } from "../../store/forgotpw/actionCreator";

export default function FormDialog(props) {
    const { open, onCloseButtonClick } = props;
    const [userEmail, setUserEmail] = React.useState("");
    const changeHandler = e => {
        setUserEmail(e.target.value)
    }
    const dispatch = useDispatch();
    const forgotPwPostResponse = useSelector(
        (state) => state.forgotPwReducer.forgotPwPostResponse
    );
    const forgotPwPostErrResponse = useSelector(
        (state) => state.forgotPwReducer.forgotPwPostErrResponse
    );

    const resetReduxStoreAndHideNotifications = () => {
        console.log("resetting")
        dispatch(handleForgotPwSuccess({ data: null }))
        dispatch(handleForgotPwError(null))
        dispatch(showNotificationError(false, ""));
        dispatch(showNotificationSuccess(false, ""));
    }

    useEffect(() => {
        if (forgotPwPostResponse) {
            dispatch(showNotificationError(true, SUCCESS_ON_SAVE));
        } else if (forgotPwPostErrResponse) {
            console.log(forgotPwPostErrResponse)
            dispatch(showNotificationError(true, forgotPwPostErrResponse));
        }
    }, [forgotPwPostResponse, forgotPwPostErrResponse]);

    const pwprocessRequest = () => {
        const pwrequestBody = {
            email: userEmail,
        };
        dispatch(forgotPw(pwrequestBody));
        onCloseButtonClick()
    };

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const onResetButtonClick = () => {
        console.log("reset email" + userEmail)
        if (userEmail === "") {
            dispatch(showNotificationError(true, "Please enter the email ", "reset"));
        }
        else if (validateEmail(userEmail) === false) {
            dispatch(showNotificationError(true, "email format is not valid 111", "reset"));
        }
        else {
            dispatch(showNotificationError(false, ""));
            pwprocessRequest();
        }
    };

    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your email address and we will send you an email to reset your password
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        id="resetEmailFormat"
                        type="email"
                        //value={userEmail}
                        onChange={changeHandler}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        className="button-block"
                        onClick={() => onCloseButtonClick()}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className="button-block"
                        onClick={() => onResetButtonClick()}
                    >
                        Reset
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
