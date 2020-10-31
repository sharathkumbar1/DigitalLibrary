import React from "react";
import { Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { showNotificationSuccess } from "../../store/notification/actionCreator";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useDispatch, useSelector } from "react-redux";

const styles = () => ({
  container: {
    position: "fixed",
    margin: "0 auto",
    maxWidth: "640px",
  },
  root: {
    justifyContent: "center",
  },
  message: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    marginRight: "8px",
    color: "#43a047",
  },
});

const NotificationSuccess = (props) => {
  const { classes } = props;
  const notificationIsShown = useSelector(
    (state) => state.notification.isShownSuccess
  );
  const notificationMessage = useSelector(
    (state) => state.notification.messageSuccess
  );
  const dispatch = useDispatch();

  const handleRequestClose = () => {
    console.log("I'm there !!!")
    dispatch(showNotificationSuccess(false));
    props.resetReduxStore()
  };

  return (
    <Snackbar
      open={notificationIsShown}
      message={
        <>
          <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            {notificationMessage}
          </span>

          <Button
            component={Link}
            to="/login"
            onClick={handleRequestClose}
          >
            OK
          </Button>
        </>
      }
      onClose={handleRequestClose}
      className={classes.container}
      ContentProps={{
        classes: {
          root: classes.root,
        },
      }}
    />
  );
};

export default withStyles(styles)(NotificationSuccess);
