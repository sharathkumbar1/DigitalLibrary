import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Link, Checkbox, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const SignUp = (props) => {
    const preventDefault = (event) => event.preventDefault();

    const handleRoute = (route) => {
        props.history.push(`/${route}`);
    };

    // const { active, updateWindow } = props
    // if (active === true) {

        return (
            <div>
                Create your account
                <div>
                    <TextField id="firstname" label="First Name" variant="outlined"/>
                </div>
                <div>
                    <TextField id="lastname" label="Last Name" variant="outlined"/>
                </div>
                <div>
                    <TextField id="email" label="Email" variant="outlined"/>
                </div>
                <div>
                    <TextField id="password" label="Password" variant="outlined"/>
                </div>

                <RadioGroup aria-label="gender" name="gender1">
                    <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                    <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                </RadioGroup>

                <Checkbox
                    size="small"
                    inputProps={{'aria-label': 'checkbox with small size'}}
                />
                I agree to Samarthanam {}
                <Link href="https://www.samarthanam.org/terms-conditions/" onClick={preventDefault} color="inherit">
                    Terms & Conditions
                </Link>

                <div>
                    <Button variant="contained">Sign Up</Button>
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

export default withStyles(styles)(SignUp);
