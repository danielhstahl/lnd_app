import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ConnectButton from './ConnectButton'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
export const SignIn=({
    ipAddress, 
    walletPassword, 
    history
})=>(
    <Dialog
        open={true}
        onClose={history.back}
        aria-labelledby="form-dialog-title"
    >
        <DialogTitle id="form-dialog-title">Connect to Lightning Node</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your (external) IP address and wallet password.  We do not track or keep passwords.  
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="ipaddress"
                    value={ipAddress}
                    label="IP Address"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    value={walletPassword}
                    id="walletpassword"
                    label="Wallet Password"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={history.back} color="primary">
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
        back:PropTypes.func.isRequired
    }).isRequired
}

const mapStateToProps=({signin})=>({
    ipAddress:signin.ip,
    walletPassword:signin.password
})
export default connect(
    mapStateToProps
)(SignIn)