import React from 'react'
import Button from 'components/CustomButtons/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux' 
import { checkConnection, unlockWallet, createInvoice } from 'Actions/connectActions'
import { setMacaroon} from 'Actions/signInActions'
import {resetInvoice} from 'Actions/invoiceActions'
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
    styles,
    ...rest
})=>isConnecting?
    <PrimaryColorProgress/>:
    <Button {...styles} onClick={handleConnect(rest)}>
        {children}
    </Button>

LndButton.propTypes={
    handleConnect:PropTypes.func.isRequired,
    isConnecting:PropTypes.bool.isRequired,
    children:PropTypes.node.isRequired //
}

const mapStateToProps=({signin, connection, encryptedMacaroon})=>({
    isConnecting:connection.isConnecting,
    ...signin,
    encryptedMacaroon
})

const createConnectHOC=dispatch=>val=>()=>{
    const {value}=setMacaroon(dispatch)(val)()
    if(value){
        checkConnection(dispatch)({...val, encryptedMacaroon:value})()
    }
    else{
        checkConnection(dispatch)(val)()
    }
}
const mapDispatchToPropsConnectButton=dispatch=>({
    handleConnect:createConnectHOC(dispatch)  
})
export const ConnectButton=connect(
    mapStateToProps,
    mapDispatchToPropsConnectButton
)(LndButton)

const mapDispatchToPropsUnlockWalletButton=dispatch=>({
    handleConnect:unlockWallet(dispatch)
})
export const UnlockWalletButton=connect(
    mapStateToProps,
    mapDispatchToPropsUnlockWalletButton
)(LndButton)

const createInvoiceHOC=dispatch=>val=>()=>{
    createInvoice(dispatch)(val)()
    resetInvoice(dispatch)
}
const mapDispatchToPropsCreateInvoice=dispatch=>({
    handleConnect:createInvoiceHOC(dispatch)
})
const mapStateToPropsCreateInvoice=({signin, connection, encryptedMacaroon, invoice})=>({
    isConnecting:connection.isConnecting,
    ...signin,
    ...invoice,
    encryptedMacaroon,
    //amount:invoice.amount
})
export const CreateInvoiceButton=connect(
    mapStateToPropsCreateInvoice,
    mapDispatchToPropsCreateInvoice
)(LndButton)