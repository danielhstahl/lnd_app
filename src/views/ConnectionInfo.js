import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
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
import {convertBTC} from '../utils/btcUtils'

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

const ChainStats=({message, info, classes})=>{
    const variant =filterMessageVariant(message)
    const Icon = variantIcon[variant]
    return (
    <div>
        Status: {message===NO_ATTEMPT?'Disconnected':(info.synced_to_chain?"Synced":"Syncing...")}
        <div className={classNames(classes.logoImage, classes[variant+'Icon'])}>
            <Icon className={classes.img}/>
        </div>
        {filterInfo(message, info)}
    </div>
    )
}
const mapStateToPropsChain=({connection, network})=>({
    message:connection.connectionStatus,
    info:network.generalInfo
})
const ChainStatsConnected=connect(
    mapStateToPropsChain
)(ChainStats)

const BalanceStats=({balance})=>balance.total_balance!==undefined?(
    <span>
        Total: {convertBTC(balance.total_balance)} BTC<br/>
        Confirmed: {convertBTC(balance.confirmed_balance)} BTC
    </span>
):null
const mapStateToPropsBalance=({ network})=>({
    balance:network.balance
})
const BalanceStatsConnected=connect(
    mapStateToPropsBalance
)(BalanceStats)

export default withStyles(stylesSnackContent)(({classes})=>(
    <div className={classes.otherInfo}>
        <span className={classes.otherInfoLink}>
            <ChainStatsConnected
                classes={classes} 
            />
            <BalanceStatsConnected/>
        </span>
    </div>
))




