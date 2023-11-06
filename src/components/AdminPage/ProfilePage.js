import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Grid, Link } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { url } from "../../config/apiCalls";

const useStyles = makeStyles((theme) => ({
  homePage: {
    textAlign: "center",
  },
  homePageIntro: {
    fontSize: "large",
  },
  button: {
    margin: theme.spacing.unit,
  },
  profileIcon: {
    "& svg": {
      fontSize: 100,
      padding: "0px 20px 0px 20px",
    },
    display: "contents",
    position: "relative",
    bottom: "30px",
  },
  paddingTop: {
    position: "relative",
    bottom: "50px",
    right: "150px",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const classes = useStyles();
  let history = useHistory();
  const [value, setValue] = React.useState(0);
  let dispatch = useDispatch();
  const userdata = useSelector((state) => state.signInReducer);
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let currentUserId = userdata.signInPostResponse.userSequenceId;

    fetch(
      url+"user/profile/" +
        currentUserId
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setProfileData(result);
          console.log(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  const {
    first_name = "",
    last_name = "",
    email_address = "",
    gender = "",
    create_date = "",
  } = profileData;

  var date = new Date(create_date).toLocaleDateString("en-US");
  var formattedDate = moment(date).format("Do MMMM YYYY");
  console.log("Dateeeeeee ======= " + formattedDate);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRoute = (route) => {
    history.push(`${route}`);
  };

  const handleClickOpen = () => {
    handleRoute("/forgotpw");
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="My Profile" {...a11yProps(0)} />
        </Tabs>
      </AppBar>

      <div>
        <IconButton
          className={classes.profileIcon}
          color="inherit"
          aria-label="profile"
        >
          <AccountCircleIcon />
        </IconButton>
      </div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {["First Name", "Last Name", "Gender", "Email", "Created Date"].map(
          (value) => (
            <ListItem key={value} disableGutters>
              <ListItemText
                style={{
                  paddingTop: "10px",
                  paddingLeft: "20px",
                  fontWeight: 700,
                }}
                primary={`${value}`}
              />
            </ListItem>
          )
        )}
      </List>

      {profileData && (
        <div>
          <TextField
            id="standard-basic"
            variant="standard"
            value={first_name}
            InputProps={{
              readOnly: true,
            }}
            style={{ position: "relative", bottom: "283px", left: "150px" }}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            value={last_name}
            InputProps={{
              readOnly: true,
            }}
            style={{ position: "relative", bottom: "230px", right: "15px" }}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            value={gender}
            InputProps={{
              readOnly: true,
            }}
            style={{ position: "relative", bottom: "200px", left: "150px" }}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            value={email_address}
            InputProps={{
              readOnly: true,
            }}
            style={{ position: "relative", bottom: "150px", right: "18px" }}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            value={formattedDate}
            InputProps={{
              readOnly: true,
            }}
            style={{ position: "relative", bottom: "120px", left: "150px" }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.paddingTop}
            onClick={handleClickOpen}
          >
            Change Password
          </Button>
        </div>
      )}
    </div>
  );
}
