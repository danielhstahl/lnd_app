import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import green from '@material-ui/core/colors/green'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import amber from '@material-ui/core/colors/amber'

import WarningIcon from '@material-ui/icons/Warning'


import { withStyles } from '@material-ui/core/styles'
import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx"
import snackbarContentStyle from "assets/jss/material-dashboard-react/components/snackbarContentStyle.jsx"
import {
    CONNECTION_BUT_LOCKED, 
    CONNECTION_UNLOCKED, 
    NO_CONNECTION,
    NO_ATTEMPT
} from '../Reducers/connectReducer'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    danger: ErrorIcon,
    info: InfoIcon,
}

const stylesSnackContent = theme => ({
    ...snackbarContentStyle,
    ...sidebarStyle(theme)
})
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

const filterInfo=(message, info)=>{
    switch(message){
        case CONNECTION_UNLOCKED:
            return <span>
                    <br/>
                    Peers: {info.num_peers}<br/>
                    Network: {info.testnet?"TestNet":"MainNet"}<br/>
                    Block Height: {info.block_height}
                </span>
        case CONNECTION_BUT_LOCKED:
            return 'Wallet is locked'
        case NO_CONNECTION:
            return 'Could not connect'
        default:
            return ''
    }
}

const ConnectionInfo=withStyles(stylesSnackContent)(({classes, message, info})=>{
    const variant =filterMessageVariant(message)
    const Icon = variantIcon[variant]
    return (
        <div className={classes.otherInfo}>
            <span className={classes.otherInfoLink}>
                Status: {message===NO_ATTEMPT?'Disconnected':(info.synced_to_chain?"Synced":"Syncing...")}
                <div className={classNames(classes.logoImage, classes[variant+'Icon'])}>
                    <Icon className={classes.img}/>
                </div>
                {filterInfo(message, info)}
            </span>
        </div>
    )
})

const mapStateToProps=({connection, network})=>({
    message:connection.connectionStatus,
    info:network.generalInfo
})

export default connect(
    mapStateToProps
)(ConnectionInfo)
