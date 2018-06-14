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
import {
  Route
} from 'react-router-dom'
import {updateSignIn} from '../Actions/signInActions'
import {IP_KEY, PORT_KEY, MACAROON_KEY, TLS_KEY, PASSWORD_KEY} from './signInDefinitions'

const OnlyLightningNodeInfo=({signin, updateSignIn})=>[
    <TextField
        autoFocus
        key={IP_KEY}
        margin="dense"
        value={signin[IP_KEY]}
        onChange={updateSignIn(IP_KEY)}
        label="IP Address"
        type="text"
        fullWidth
    />,
    <TextField
        key={PORT_KEY}
        margin="dense"
        value={signin[PORT_KEY]}
        onChange={updateSignIn(PORT_KEY)}
        label="Port"
        type="text"
        fullWidth
    />,
    <TextField
        key={MACAROON_KEY}
        margin="dense"
        value={signin[MACAROON_KEY]}
        onChange={updateSignIn(MACAROON_KEY)}
        label="Macaroon"
        type="text"
        fullWidth
    />,
    <TextField
        key={TLS_KEY}
        margin="dense"
        value={signin[TLS_KEY]}
        onChange={updateSignIn(TLS_KEY)}
        label="TLS"
        type="text"
        fullWidth
    />
]
const FirstTimeRender=({signin, updateSignIn})=>[
    <DialogContentText key='contentHead'>
        Enter your IP, port, macaroon, and TLS key.  These are stored in local storage, so add a password for encryption.
    </DialogContentText>,
    <OnlyLightningNodeInfo 
        key='nodeInfo'
        signin={signin} 
        updateSignIn={updateSignIn}
    />,
    <TextField
        key='passKey'
        margin="dense"
        value={signin[PASSWORD_KEY]}
        onChange={updateSignIn(PASSWORD_KEY)}
        label="Password"
        type="password"
        fullWidth
    />
]

const OnlyPassword=({signin, updateSignIn})=>[
    <DialogContentText key='contentHead'>
        Enter password to access site
    </DialogContentText>,
    <TextField
        key='passKey'
        margin="dense"
        value={signin[PASSWORD_KEY]}
        onChange={updateSignIn(PASSWORD_KEY)}
        label="Password"
        type="password"
        fullWidth
    />
]
export const SignIn=({
    history,
    updateSignIn,
    match,
    ...signin
})=>(
    <Dialog
        open={true}
        onClose={history.goBack}
        aria-labelledby="form-dialog-title"
    >
        <DialogTitle id="form-dialog-title">Provide Lightning Node Credentials</DialogTitle>
            <DialogContent>
                <Route 
                    path='/signin/firsttime'
                    render={()=><FirstTimeRender signin={signin} updateSignIn={updateSignIn}/>}
                />
                <Route 
                    path='/signin/password'
                    render={()=><OnlyPassword signin={signin} updateSignIn={updateSignIn}/>}
                />
                <Route 
                    path='/signin/updatewallet'
                    render={()=><OnlyLightningNodeInfo signin={signin} updateSignIn={updateSignIn}/>}
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
    [IP_KEY]:PropTypes.string.isRequired,
    [PORT_KEY]:PropTypes.string.isRequired,
    [MACAROON_KEY]:PropTypes.string.isRequired,
    [TLS_KEY]:PropTypes.string.isRequired,
    [PASSWORD_KEY]:PropTypes.string.isRequired,
    history:PropTypes.shape({
        goBack:PropTypes.func.isRequired
    }).isRequired,
    updateSignIn:PropTypes.func.isRequired
}

const mapStateToProps=({signin})=>signin
const mapDispatchToProps=dispatch=>({
    updateSignIn:updateSignIn(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)