import React from 'react'
import QRCode from 'qrcode.react'
import Dialog from '@material-ui/core/Dialog'
import { connect } from 'react-redux' 
import CustomInput from 'components/CustomInput/CustomInput'
import Button from 'components/CustomButtons/Button'
import {toggleQRRaw, toggleQRShow} from 'Actions/qrActions'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export const QRView=({qrRaw, showRaw, toggleRaw, open, handleClose})=>(
<Dialog open={open} onClose={handleClose}>
    {showRaw?<CustomInput labelText="Payment Request" inputProps={{value:qrRaw, multiline:true}}/>:<QRCode value={qrRaw} />}
    <Button onClick={toggleRaw}>Toggle Raw</Button>
</Dialog>
)
const mapStateToProps=({qr})=>({
    showRaw:qr.showRaw,
    open:qr.open
})
const mapDispatchToProps=dispatch=>({
    toggleRaw:toggleQRRaw(dispatch),
    handleClose:toggleQRShow(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QRView)

