import React from 'react'
import Button from 'components/CustomButtons/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux' 
//import classNames from 'classnames'
import { checkConnection, unlockWallet } from '../Actions/connectActions'
import { setMacaroon} from '../Actions/signInActions'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
    primaryColor
  } from "assets/jss/material-dashboard-react.jsx"
const styles={
    progress:{
        color:primaryColor
    }
}
const PrimaryColorProgress=withStyles(styles)(({classes})=><CircularProgress className={classes.progress}/>)
/**Exporting for testing */
export const LndButton=({
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

const mapStateToProps=({signin, connection, encryptedMacaroon})=>({
    isConnecting:connection.isConnecting,
    ...signin,
    encryptedMacaroon
})

const mapDispatchToPropsConnectButton=dispatch=>({
    handleConnect:val=>()=>{
        const {value}=setMacaroon(dispatch)(val)()
        if(value){
            checkConnection(dispatch)({...val, encryptedMacaroon:value})()
        }
        else{
            checkConnection(dispatch)(val)()
        }
        
    }      
})
export const ConnectButton=connect(
    mapStateToProps,
    mapDispatchToPropsConnectButton
)(LndButton)
/*
const mapStateToPropsUnlockWalletButton=({signin, connection, encryptedMacaroon})=>({
    isConnecting:connection.isConnecting,
    ...signin,
    encryptedMacaroon
})*/
const mapDispatchToPropsUnlockWalletButton=dispatch=>({
    handleConnect:unlockWallet(dispatch)
})
export const UnlockWalletButton=connect(
    mapStateToProps,
    mapDispatchToPropsUnlockWalletButton
)(LndButton)