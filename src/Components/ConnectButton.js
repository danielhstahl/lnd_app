import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux' 
import { checkConnection } from '../Actions/connectActions.js'
import PropTypes from 'prop-types'
export const ConnectButton=({
    handleConnect,
    isConnecting,
    children,
    ...rest
})=>isConnecting?
    <CircularProgress/>:
    <Button {...rest} onClick={handleConnect(rest)}>
        {children}
    </Button>

ConnectButton.propTypes={
    handleConnect:PropTypes.func.isRequired //
}

const mapStateToProps=({signin, connection})=>({
    isConnecting:connection.isConnecting,
    ...signin
})
const mapDispatchToProps=dispatch=>({
    handleConnect:checkConnection(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectButton)