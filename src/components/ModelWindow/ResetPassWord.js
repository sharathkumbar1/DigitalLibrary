import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { forgotPw } from "../../store/forgotpw/actionCreator";
import { useDispatch, useSelector } from "react-redux";

export default function FormDialog(props) {
    const { open, onCloseButtonClick } = props;
    const [userEmail, setUserEmail] = React.useState("");

    const changeHandler = e => {
        setUserEmail(e.target.value)
    }

    const dispatch = useDispatch();

    const handleRoute = (route) => {
        console.log('this is route : ' + `/${route}`)
        props.history.push(`/${route}`);
    };

    const pwprocessRequest = () => {
        const pwrequestBody = {
            email: userEmail,
        };

        dispatch(forgotPw(pwrequestBody));
        //handleRoute("login")
        onCloseButtonClick()

    };

    const onResetButtonClick = () => {
        console.log("reset email" + userEmail)
        pwprocessRequest();
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
