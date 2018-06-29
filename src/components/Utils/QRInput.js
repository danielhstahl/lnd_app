import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import QrReader from 'react-qr-scanner'
import {updatePaymentRequest} from 'Actions/paymentActions'
import {updateSignIn} from 'Actions/signInActions'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import {setQRRaw, setQRRawMacaroon} from 'Actions/qrActions'
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
            setQRRaw(dispatch)(false)()
        }
    }
})

export const QRInputPaymentRequest=connect(
    mapStateToPropsPaymentRequest,
    mapDispatchToPropsPaymentRequest
)(QRInput)

const mapStateToPropsMacaroon=({qr, signin})=>({
    showRaw:qr.showRawMacaroon,
    value:signin.macaroon
})

const mapDispatchToPropsMacaroon=dispatch=>({
    onChange:value=>{
        if(value){
            updateSignIn(dispatch)('macaroon')(value)
            setQRRawMacaroon(dispatch)(false)()
        }   
    }
})

export const QRInputMacaroon=connect(
    mapStateToPropsMacaroon,
    mapDispatchToPropsMacaroon
)(QRInput)


const mapDispatchToPropsToggle=dispatch=>({
    toggleRaw:setQRRaw(dispatch)
})

const mapDispatchToPropsToggleMacaroon=dispatch=>({
    toggleRaw:setQRRawMacaroon(dispatch)
})
export const ToggleButton=({toggleRaw, showRaw, styles})=>(
    <Button color='primary' onClick={toggleRaw(showRaw)} {...styles}>
        {showRaw?'Scan QR':'Show Raw String'}
    </Button>
)
export const ToggleQRButton=connect(
    mapStateToPropsPaymentRequest,
    mapDispatchToPropsToggle
)(ToggleButton)

export const ToggleQRButtonMacaroon=connect(
    mapStateToPropsMacaroon,
    mapDispatchToPropsToggleMacaroon
)(ToggleButton)