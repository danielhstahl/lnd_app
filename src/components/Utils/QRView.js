import React from 'react'
import QRCode from 'qrcode.react'
import Dialog from '@material-ui/core/Dialog'
import { connect } from 'react-redux' 
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from 'components/CustomButtons/Button'
import {toggleQRRaw, toggleQRShow} from 'Actions/qrActions'
import PropTypes from 'prop-types'

const formControlProps={fullWidth:true}
export const QRView=({qrRaw, showRaw, toggleRaw, open, handleClose, title})=>(
<Dialog open={open} onClose={handleClose} fullWidth>
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    <DialogContent>
        {showRaw?<CustomInput 
            labelText="Payment Request" 
            inputProps={{value:qrRaw, multiline:true}}
            formControlProps={formControlProps}
            />:<QRCode value={qrRaw} />}
    </DialogContent>
    <DialogActions>
        <Button color='primary' onClick={handleClose}>Close</Button>
        <Button color='primary' onClick={toggleRaw}>{showRaw?'Show QR':'Show Hash'}</Button>
    </DialogActions>
</Dialog>
)
QRView.propTypes={
    qrRaw:PropTypes.string.isRequired,
    showRaw:PropTypes.bool.isRequired,
    toggleRaw:PropTypes.func.isRequired,
    open:PropTypes.bool.isRequired,
    handleClose:PropTypes.func.isRequired
}
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

