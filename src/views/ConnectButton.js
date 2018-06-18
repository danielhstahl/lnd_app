import React from 'react'
import Button from 'components/CustomButtons/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux' 
import { checkConnection, unlockWallet } from '../Actions/connectActions'
import { setMacaroon} from '../Actions/signInActions'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
    primaryColor
  } from "assets/jss/material-dashboard-react.jsx"
const styles=theme=>({
    color:primaryColor
})
const PrimaryColorProgress=withStyles(styles)(CircularProgress)
const LndButton=({
    handleConnect,
    isConnecting,
    children,
    ...rest
})=>isConnecting?
    <PrimaryColorProgress/>:
    <Button {...rest} onClick={handleConnect(rest)}>
        {children}
    </Button>

LndButton.propTypes={
    handleConnect:PropTypes.func.isRequired //
}

const mapStateToPropsConnectButton=({signin, connection})=>({
    isConnecting:connection.isConnecting,
    ...signin
})

const mapDispatchToPropsConnectButton=dispatch=>({
    handleConnect:val=>()=>{
        return setMacaroon(dispatch)(val)
            .then(checkConnection(dispatch)(val))
    }      
})
export const ConnectButton=connect(
    mapStateToPropsConnectButton,
    mapDispatchToPropsConnectButton
)(LndButton)

const mapStateToPropsUnlockWalletButton=({signin, connection})=>({
    isConnecting:connection.isConnecting,
    ...signin
})
const mapDispatchToPropsUnlockWalletButton=dispatch=>({
    handleConnect:unlockWallet(dispatch)
})
export const UnlockWalletButton=connect(
    mapStateToPropsUnlockWalletButton,
    mapDispatchToPropsUnlockWalletButton
)(LndButton)