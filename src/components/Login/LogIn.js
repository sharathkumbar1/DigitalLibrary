import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, Link, TextField} from '@material-ui/core'

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const LogIn = (props) => {

    const handleRoute = (route) => {
        props.history.push(`/${route}`);
    };

    // const { active, updateWindow } = props
    // if (active === true) {
        return (
            <div>
                Sign In
                <div>
                    <TextField id="email" label="Email" variant="outlined"/>
                </div>
                <div>
                    <TextField id="password" label="Password" variant="outlined"/>
                </div>
                <div>
                    <Button variant="contained">Sign In</Button>
                </div>
                <div>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            console.info("Forgot Password?");
                        }}
                    >
                        Forgot Password?
                    </Link>
                </div>
                <div>
                    <Link
                        component="button"
                        variant="body2"
                        // onClick={() => updateWindow('SIGNUP')}
                        onClick={() => handleRoute('signup')}

                    >
                        New to Library? Sign Up
                    </Link>
                </div>
            </div>
        );
    // } else
    //     return null
};

export default withStyles(styles)(LogIn);
