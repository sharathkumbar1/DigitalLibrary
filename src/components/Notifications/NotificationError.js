import React, { useEffect, useRef, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import SnackbarContent from '@material-ui/core/SnackbarContent/SnackbarContent'
import IconButton from '@material-ui/core/IconButton/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import { useDispatch, useSelector } from 'react-redux'

const styles = theme => ({
  container: {
    position: 'absolute',
    margin: '0 auto',
    maxWidth: '640px',
  },
  snackbarContent: {
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: '0px 6px',
  },
  snackbarAction: {
    paddingLeft: '8px',
    display: 'block',
  },
  root: {
    justifyContent: 'center',
  },
  messageContainer: {
    display: 'flex',
    maxHeight: 120,
    overflowY: 'scroll',
  },
  message: {
    paddingRight: '10px',
    marginTop: '2px',
  },
  icon: {
    marginRight: '8px',
    color: theme.palette.primary.main,
  },
  backdrop: {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    width: '100%',
    height: '100vh',
    top: '0',
    left: '0',
  }
})

const NotificationError = (props) => {
  const closeFocusRef = useRef()
  const { classes } = props
  const notificationIsShown = useSelector(state => state.notification.isShownError)
  const notificationMessage = useSelector(state => state.notification.messageError)
  const notificationInWhichPage = useSelector(state => state.notification.inWhichPage)
  const dispatch = useDispatch()
  console.log("notificationInWhichPage", notificationInWhichPage)

  useEffect(()=>{
    console.log(closeFocusRef);
    if(notificationIsShown){
      closeFocusRef.current.focus();
    }
    
  }, [notificationIsShown])
  const handleRequestClose = (event, reason) => {
    console.log("bbb ", notificationMessage);
   console.log( "aaaa ", notificationMessage.indexOf("gender"))
    if(notificationMessage.indexOf("Email")>0 && notificationInWhichPage == "login"){
      document.getElementById("email").focus();
    } else if(notificationMessage.indexOf("Password")>0 && notificationInWhichPage == "login"){
      document.getElementById("password").focus();
    } else if(notificationMessage.indexOf("the email")>=0 && notificationInWhichPage == "reset"){
      console.log("1111112")
      document.getElementById("resetEmailFormat").focus();
    } else if(notificationMessage.indexOf("email format")>=0 && notificationInWhichPage == "reset"){
      console.log("22222223")
      document.getElementById("resetEmailFormat").focus();
    } else if(notificationMessage.indexOf("First Name")>0){
      document.getElementById("firstName").focus();
    } else if(notificationMessage.indexOf("Last Name")>0){
      document.getElementById("lastName").focus();
    } else if(notificationMessage.indexOf("Email")>0){
      document.getElementById("signupEmail").focus();
    } else if(notificationMessage.indexOf("Password")>0){
      document.getElementById("signupPassword").focus();
    } else if(notificationMessage.indexOf("Confirm")>=0){
      document.getElementById("confirmPassword").focus();
    } else if(notificationMessage.indexOf("gender")>0){
      document.getElementById("gender").focus();
    } else if(notificationMessage.indexOf("Please accept")>=0){
      document.getElementById("agree").focus();
    } 
    props.resetReduxStoreAndHideNotifications()


  }
  const createMarkup = str => {
    return { __html: str }
  }

  return (
    <Snackbar
      open={notificationIsShown}
      autoHideDuration={null}
      TransitionComponent={Fade}
      className={classes.container}
      ContentProps={{
        classes: {
          root: classes.root,
        },
      }}
    >
      <SnackbarContent
        classes={{
          root: classes.snackbarContent,
          action: classes.snackbarAction,
        }}
        aria-describedby="client-snackbar"
        message={
          <span className={classes.messageContainer}>
            <ErrorIcon className={classes.icon} />
            <p className={classes.message} dangerouslySetInnerHTML={createMarkup(notificationMessage)} />
          </span>
        }
        action={[
          <IconButton key="close" id="notificationCloseBtn" aria-label="Close" color="inherit" ref={closeFocusRef} onClick={handleRequestClose}>
            <CloseIcon className={classes.closeButton} />
          </IconButton>,
        ]}
      />
    </Snackbar>
    
  )
}

export default withStyles(styles)(NotificationError)
