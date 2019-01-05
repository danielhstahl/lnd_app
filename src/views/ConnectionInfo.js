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
    CONNECT_FAILED,
    CONNECT_UNLOCKED,
    CONNECT_LOCKED,
    CONNECT_NO_ATTEMPT
} from 'Actions/actionDefinitions'
import {
    MUI_SUCCESS, 
    MUI_WARNING, 
    MUI_DANGER,
    MUI_INFO
} from 'utils/componentUtils'
import {convertSatoshiToBTC} from 'utils/btcUtils'
const variantIcon = {
    [MUI_SUCCESS]: CheckCircleIcon,
    [MUI_WARNING]: WarningIcon,
    [MUI_DANGER]: ErrorIcon,
    [MUI_INFO]: InfoIcon,
}

const stylesSnackContent = theme => ({
    ...snackbarContentStyle,
    ...sidebarStyle(theme)
})

const filterInfo=(connectStatus, info)=>{
    switch(connectStatus){
        case CONNECT_UNLOCKED:
            return <span>
                    <br/>
                    Peers: {info.num_peers}<br/>
                    Network: {info.testnet?"TestNet":"MainNet"}<br/>
                    Block Height: {info.block_height}
                </span>
        case CONNECT_LOCKED:
            return 'Wallet is locked'
        case CONNECT_FAILED:
            return 'Could not connect'
        default:
            return ''
    }
}
const filterStatus=(connectStatus, info)=>{
    switch(connectStatus){
        case CONNECT_NO_ATTEMPT:
            return 'Disconnected'
        default:
            return info.synced_to_chain?"Synced":"Syncing..."
    }
}

const convertStatusToIcon=status=>{
    switch(status){
        case CONNECT_UNLOCKED:
            return MUI_SUCCESS
        case CONNECT_LOCKED:
            return MUI_WARNING
        case CONNECT_FAILED:
            return MUI_DANGER
        default:
            return MUI_INFO
    }
}

export const ChainStats=({connectStatus, info, classes})=>{
    const variant=convertStatusToIcon(connectStatus)
    const Icon = variantIcon[variant]
    return (
    <div>
        Status: {filterStatus(connectStatus, info)}
        <div className={classNames(classes.logoImage, classes[variant+'Icon'])}>
            <Icon className={classes.img}/>
        </div>
        {filterInfo(connectStatus, info)}
    </div>
    )
}
ChainStats.propTypes={
    connectStatus:PropTypes.string.isRequired,
    info:PropTypes.shape({
        num_peers:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        testnet:PropTypes.bool,
        block_height:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        synced_to_chain:PropTypes.bool
    }).isRequired,
    classes:PropTypes.shape({
        logoImage:PropTypes.string,
        img:PropTypes.string
    }).isRequired
}
const mapStateToPropsChain=({connection, network})=>({
    connectStatus:connection.connectStatus,
    info:network.generalInfo
})
const ChainStatsConnected=connect(
    mapStateToPropsChain
)(ChainStats)

const BalanceStats=({balance})=>balance.total_balance!==undefined?(
    <span>
        Total: {convertSatoshiToBTC(balance.total_balance)} BTC<br/>
        Confirmed: {convertSatoshiToBTC(balance.confirmed_balance)} BTC
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




