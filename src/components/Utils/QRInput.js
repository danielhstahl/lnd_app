import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import QrReader from 'react-qr-reader'
import {updatePaymentRequest} from 'Actions/paymentActions'
import {updateSignIn} from 'Actions/signInActions'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import {toggleQRRaw} from 'Actions/qrActions'
import Button from 'components/CustomButtons/Button'
import { withStyles } from '@material-ui/core/styles'
const style=theme=>({
    qr:{
        [theme.breakpoints.up("md")]:{
            width:'60%'
        },    
        margin: 'auto'
    }
})
const formControlProps={fullWidth:true}
export const QRInput=withStyles(style)(({
    showRaw, labelText,
    value, onChange, classes
})=>showRaw?
    <CustomInput 
        labelText={labelText}
        inputProps={{
            value, 
            multiline:true,
            onChange
        }}
        formControlProps={formControlProps}
    />:
    <QrReader 
        className={classes.qr} 
        onError={err=>console.log(err)}
        onScan={onChange}
        showViewFinder={false}
    />
)

QRInput.propTypes={
    showRaw:PropTypes.bool.isRequired,
    value:PropTypes.string,
    labelText:PropTypes.string,
    onChange:PropTypes.func.isRequired
}

const mapStateToPropsPaymentRequest=({qr, payment})=>({
    showRaw:qr.showRaw,
    value:payment
})

const mapDispatchToPropsPaymentRequest=dispatch=>({
    onChange:updatePaymentRequest(dispatch)
})

export const QRInputPaymentRequest=connect(
    mapStateToPropsPaymentRequest,
    mapDispatchToPropsPaymentRequest
)(QRInput)

const mapStateToPropsMacaroon=({qr, signin})=>({
    showRaw:qr.showRaw,
    value:signin.macaroon
})

const mapDispatchToPropsMacaroon=dispatch=>({
    onChange:updateSignIn(dispatch)('macaroon')
})

export const QRInputMacaroon=connect(
    mapStateToPropsMacaroon,
    mapDispatchToPropsMacaroon
)(QRInput)

const mapStateToPropsToggle=({qr})=>({
    showRaw:qr.showRaw
})
const mapDispatchToPropsToggle=dispatch=>({
    toggleRaw:toggleQRRaw(dispatch)
})
export const ToggleButton=({toggleRaw, showRaw, styles})=>(
    <Button color='primary' onClick={toggleRaw} {...styles}>
        {showRaw?'Scan QR':'Show Raw String'}
    </Button>
)
export const ToggleQRButton=connect(
    mapStateToPropsToggle,
    mapDispatchToPropsToggle
)(ToggleButton)