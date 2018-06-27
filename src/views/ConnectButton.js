import React from 'react'
import Button from 'components/CustomButtons/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux' 
import { checkConnection, unlockWallet, createInvoice, sendPayment } from 'Actions/connectActions'
import { setMacaroon, setHostname} from 'Actions/signInActions'
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

const mapStateToProps=({signin, connection, encryptedMacaroon, savedHostname})=>({
    isConnecting:connection.isConnecting,
    ...signin,
    encryptedMacaroon, savedHostname
})

const createConnectHOC=dispatch=>val=>()=>{
    const encryptedMacaroon=setMacaroon(dispatch)(val)()
    const savedHostname=setHostname(dispatch)(val)()
    const options={
        ...val, 
        encryptedMacaroon:encryptedMacaroon||val.encryptedMacaroon,
        savedHostname:savedHostname||val.savedHostname
    }
    checkConnection(dispatch)(options)()
   
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
const mapStateToPropsCreateInvoice=({signin, connection, encryptedMacaroon, savedHostname, invoice})=>({
    isConnecting:connection.isConnecting,
    ...signin,
    ...invoice,
    encryptedMacaroon,
    savedHostname
    //amount:invoice.amount
})
export const CreateInvoiceButton=connect(
    mapStateToPropsCreateInvoice,
    mapDispatchToPropsCreateInvoice
)(LndButton)


const mapStateToPropsSendPayment=({connection, encryptedMacaroon, payment, savedHostname})=>({
    isConnecting:connection.isConnecting,
    paymentRequest:payment,
    encryptedMacaroon, 
    savedHostname
})
const mapDispatchToPropsSendPayment=dispatch=>({
    handleConnect:sendPayment(dispatch)
})
export const SendPaymentButton=connect(
    mapStateToPropsSendPayment,
    mapDispatchToPropsSendPayment
)(LndButton)