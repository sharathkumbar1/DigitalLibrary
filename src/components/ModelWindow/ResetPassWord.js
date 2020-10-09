import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    const { open, onCloseButtonClick } = props;

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
                    onClick={() => onCloseButtonClick()}
                    >
                        Reset
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
