import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux' 
import { getConnectionInformation } from '../Actions/connectActions.js'
import PropTypes from 'prop-types'
export const ConnectButton=({
    handleConnect,
    isConnecting,
    children,
    ipAddress,
    walletPassword,
    ...rest
})=>isConnecting?
    <CircularProgress/>:
    <Button {...rest} onClick={handleConnect({ipAddress, walletPassword})}>
        {children}
    </Button>

ConnectButton.propTypes={
    handleConnect:PropTypes.func.isRequired //
}

const mapStateToProps=({signin, connection})=>({
    isConnecting:connection.isConnecting,
    ipAddress:signin.ip,
    walletPassword:signin.password
})
const mapDispatchToProps=dispatch=>({
    handleConnect:getConnectionInformation(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectButton)