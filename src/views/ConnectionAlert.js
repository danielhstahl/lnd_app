import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import green from '@material-ui/core/colors/green'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import amber from '@material-ui/core/colors/amber'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import {
    CONNECTION_BUT_LOCKED, 
    CONNECTION_UNLOCKED, 
    NO_CONNECTION
} from '../Reducers/connectReducer'
import { withStyles } from '@material-ui/core/styles'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const stylesSnackContent = theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
})
const SnackAlert=withStyles(stylesSnackContent)(({variant, classes, message, ...other})=>{
    const Icon = variantIcon[variant]
    return (
        <SnackbarContent
        className={classNames(classes[variant])}
        aria-describedby="client-snackbar"
        message={
            <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
            </span>
        }
        {...other}
        />
    )
})

const origin={
    vertical: 'bottom',
    horizontal: 'left',
}
const filterMessageVariant=message=>{
    switch(message){
        case CONNECTION_BUT_LOCKED:
            return 'warning' 
        case CONNECTION_UNLOCKED:
            return 'success' 
        case NO_CONNECTION:
            return 'error'
        default:
            return 'info'
    }
}
const filterMessageText=message=>{
    switch(message){
        case CONNECTION_BUT_LOCKED:
            return 'Successful connection, but wallet is locked' 
        case CONNECTION_UNLOCKED:
            return 'Successful connection!' 
        case NO_CONNECTION:
            return 'Connection could not be established!'
        default:
            return `Something happened.  But I don't know what`
    }
}
export const ConnectionAlert=({justUpdated, message})=>(
    <Snackbar
        anchorOrigin={origin}
        open={justUpdated}
    >
        <SnackAlert
            variant={filterMessageVariant(message)}
            message={filterMessageText(message)}
        />
    </Snackbar>
)

const mapStateToProps=({connection})=>({
    justUpdated:connection.justUpdated,
    message:connection.connectionStatus
})

export default connect(
    mapStateToProps
)(ConnectionAlert)