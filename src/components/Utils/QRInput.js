import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import QrReader from 'react-qr-scanner'
import {updatePaymentRequest} from 'Actions/paymentActions'
import {updateSignIn} from 'Actions/signInActions'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import {toggleQRRaw, toggleQRRawMacaroon} from 'Actions/qrActions'
import Button from 'components/CustomButtons/Button'

const formControlProps={fullWidth:true}
export const QRInput=({
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
        style={{width:'85%', margin:'auto'}}
        onError={err=>console.log(err)}
        onScan={onChange}       
    />


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
    onChange:value=>{
        if(value){
            updatePaymentRequest(dispatch)(value)
            toggleQRRaw(dispatch)()
        }
    }
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
    onChange:value=>{
        if(value){
            updateSignIn(dispatch)('macaroon')(value)
            toggleQRRawMacaroon(dispatch)()
        }   
    }
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
const mapStateToPropsToggleMacaroon=({qr})=>({
    showRaw:qr.showRawMacaroon
})
const mapDispatchToPropsToggleMacaroon=dispatch=>({
    toggleRaw:toggleQRRawMacaroon(dispatch)
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

export const ToggleQRButtonMacaroon=connect(
    mapStateToPropsToggleMacaroon,
    mapDispatchToPropsToggleMacaroon
)(ToggleButton)