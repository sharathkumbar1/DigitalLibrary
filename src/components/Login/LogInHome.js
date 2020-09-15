import React from "react";
import {withStyles} from "@material-ui/core/styles";
import LogInOrSignUp from "./LogInOrSignUp";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const styles = (theme) => ({
    button: {
        margin: theme.spacing.unit,
    },
});

const LogInHome = () => {

    // const [state, setState] = React.useState({
    //     window: 'LOGIN_SIGNUP',
    // });
    //
    // const updateWindow = (newWindow) => {
    //     setState({...state, window: newWindow});
    // };
    //
    // const {window} = state;
    //
    // return (
    //     <div>
    //         <LogInOrSignUp active={window === 'LOGIN_SIGNUP'} updateWindow={updateWindow}/>
    //         <SignUp active={window === 'SIGNUP'} updateWindow={updateWindow}/>
    //         <LogIn active={window === 'LOGIN'} updateWindow={updateWindow}/>
    //     </div>
    // );
};

export default withStyles(styles)(LogInHome);
