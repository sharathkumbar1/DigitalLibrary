import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { showNotificationError } from '../../store/notification/actionCreator'
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
    padding: '6px 10px',
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
    paddingRight: 10,
  },
  icon: {
    marginRight: '8px',
    color: theme.palette.primary.main,
  },
})

const NotificationError = props => {
  const { classes } = props
  const notificationIsShown = useSelector(state => state.notification.isShownError)
  const notificationMessage = useSelector(state => state.notification.messageError)
  const dispatch = useDispatch()

  const handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(showNotificationError(false))
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
          <IconButton key="close" aria-label="Close" color="inherit" onClick={handleRequestClose}>
            <CloseIcon className={classes.closeButton} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}

export default withStyles(styles)(NotificationError)
