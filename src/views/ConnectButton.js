import React from 'react'
import Button from 'components/CustomButtons/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux' 
import { checkConnection, unlockWallet } from '../Actions/connectActions'
import PropTypes from 'prop-types'
const LndButton=({
    handleConnect,
    isConnecting,
    children,
    ...rest
})=>isConnecting?
    <CircularProgress/>:
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
    handleConnect:checkConnection(dispatch)
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