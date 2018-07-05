import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Snackbar from 'components/Snackbar/Snackbar'
import WarningIcon from '@material-ui/icons/Warning'
import {
    MUI_SUCCESS, 
    MUI_WARNING, 
    MUI_DANGER,
    MUI_INFO
} from 'utils/componentUtils'


const variantIcon = {
  [MUI_SUCCESS]: CheckCircleIcon,
  [MUI_WARNING]: WarningIcon,
  [MUI_DANGER]: ErrorIcon,
  [MUI_INFO]: InfoIcon,
}


export const ConnectionAlert=({justUpdated, messageStatus})=>{
    const variant=messageStatus.status
    console.log(justUpdated)
    console.log(messageStatus)
    return (
        <Snackbar 
            color={variant}  
            open={justUpdated}
            place='bl'
            icon={variantIcon[variant]}
            message={messageStatus.message}
        />
    )
}
ConnectionAlert.propTypes={
    justUpdated:PropTypes.bool.isRequired,
    messageStatus:PropTypes.shape({
        status:PropTypes.string.isRequired,
        message:PropTypes.string.isRequired
    }).isRequired
}

const mapStateToProps=({connection})=>({
    justUpdated:connection.justUpdated,
    messageStatus:connection.messageStatus
})

export default connect(
    mapStateToProps
)(ConnectionAlert)