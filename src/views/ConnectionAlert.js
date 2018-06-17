import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import Snackbar from 'components/Snackbar/Snackbar'
import WarningIcon from '@material-ui/icons/Warning'
import {
    CONNECTION_BUT_LOCKED, 
    CONNECTION_UNLOCKED, 
    NO_CONNECTION
} from '../Reducers/connectReducer'


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
  info: InfoIcon,
}

const filterMessageVariant=message=>{
    switch(message){
        case CONNECTION_BUT_LOCKED:
            return 'warning' 
        case CONNECTION_UNLOCKED:
            return 'success' 
        case NO_CONNECTION:
            return 'danger'
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
export const ConnectionAlert=({justUpdated, message})=>{
    const variant=filterMessageVariant(message)
    return (
        <Snackbar 
            color={variant}  
            open={justUpdated}
            place='bl'
            icon={variantIcon[variant]}
            message={filterMessageText(message)}
        />
    )
}

const mapStateToProps=({connection})=>({
    justUpdated:connection.justUpdated,
    message:connection.connectionStatus
})

export default connect(
    mapStateToProps
)(ConnectionAlert)