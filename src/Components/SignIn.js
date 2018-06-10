import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import ConnectButton from './ConnectButton'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import {updatePassword, updateIP} from '../Actions/signInActions'
export const SignIn=({
    ipAddress, 
    walletPassword, 
    history,
    updatePassword,
    updateIP
})=>(
    <Dialog
        open={true}
        onClose={history.goBack}
        aria-labelledby="form-dialog-title"
    >
        <DialogTitle id="form-dialog-title">Connect to Lightning Node</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your (external) IP address and wallet password.  If your server is not on port 80 then add the port to the IP address.  We do not track or keep passwords.  
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="ipaddress"
                    value={ipAddress}
                    onChange={updateIP}
                    label="IP Address"
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    value={walletPassword}
                    id="walletpassword"
                    onChange={updatePassword}
                    label="Wallet Password"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={history.goBack} color="primary">
                    Cancel
                </Button>
                <ConnectButton color="primary">
                    Connect
                </ConnectButton>
        </DialogActions>
    </Dialog>
)
SignIn.propTypes={
    ipAddress:PropTypes.string.isRequired,
    walletPassword:PropTypes.string.isRequired,
    history:PropTypes.shape({
        goBack:PropTypes.func.isRequired
    }).isRequired,
    updatePassword:PropTypes.func.isRequired,
    updateIP:PropTypes.func.isRequired,
}

const mapStateToProps=({signin})=>({
    ipAddress:signin.ip,
    walletPassword:signin.password
})
const mapDispatchToProps=dispatch=>({
    updatePassword:updatePassword(dispatch),
    updateIP:updateIP(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)