import React from "react";
import {withStyles} from "@material-ui/core/styles";
import { Link } from '@material-ui/core'
import Carasoul1 from "../../images/carasoul1.png";

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const LogInOrSignUp = (props) => {

    const handleRoute = (route) => {
        props.history.push(`/${route}`);
    };

    // const { active, updateWindow } = props
    // if (active === true) {
        return (
            <div>
                Let's open the gates to accessibility...
                <div> <img src={Carasoul1} alt="Carasoul" height="400px" /> </div>
                <div>
                    <Link
                        component="button"
                        variant="body2"
                        // onClick={() => updateWindow('SIGNUP')}
                        onClick={() => handleRoute('signup')}
                    >
                        Sign Up with Email
                    </Link>
                </div>
                <div>
                    <Link
                        component="button"
                        variant="body2"
                        // onClick={() => updateWindow('LOGIN')}
                        onClick={() => handleRoute('login')}
                    >
                        Already have an account? Sign In
                    </Link>
                </div>
            </div>
        );
    // } else
    //     return null
};

export default withStyles(styles)(LogInOrSignUp);
