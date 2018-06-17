import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ConnectButton from './ConnectButton'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import {
  Route
} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {updateSignIn} from '../Actions/signInActions'
import {signInKeys} from './signInDefinitions'
import Grid from '@material-ui/core/Grid'
const {MACAROON_KEY, PASSWORD_KEY}=signInKeys
const signInKeysArray=Object.entries(signInKeys)
const notAllItemsExist=items=>!signInKeysArray.reduce((aggr, [key, value])=>aggr&&items[value])

const OnlyLightningNodeInfo=({signin, updateSignIn})=>[
    <TextField
        key={MACAROON_KEY}
        margin="dense"
        multiline
        value={signin[MACAROON_KEY]||''}
        onChange={updateSignIn(MACAROON_KEY)}
        label="Macaroon"
        type="text"
        fullWidth
    />
]
const FirstTimeRender=({signin, updateSignIn})=>[
    <Typography color="textSecondary" key='contentHead'>
        Enter your macaroon.  This is stored in local storage, so add a password for encryption.
    </Typography>,
    <OnlyLightningNodeInfo 
        key='nodeInfo'
        signin={signin} 
        updateSignIn={updateSignIn}
    />,
    <TextField
        key='passKey'
        margin="dense"
        value={signin[PASSWORD_KEY]||''}
        onChange={updateSignIn(PASSWORD_KEY)}
        label="Password"
        type="password"
        fullWidth
    />
]

const OnlyPassword=({signin, updateSignIn})=>[
    <Typography color="textSecondary" key='contentHead'>
            Enter Password to connect to Lightning Node
    </Typography>,
    <TextField
        key='passKey'
        margin="dense"
        value={signin[PASSWORD_KEY]||''}
        onChange={updateSignIn(PASSWORD_KEY)}
        label="Password"
        type="password"
        fullWidth
    />
]
const styles = theme => ({
    card: {
      padding: theme.spacing.unit * 2,
      width:500
      //textAlign: 'center',
      //color: theme.palette.text.secondary,
    },
    button:{
        float:'right',
        padding: theme.spacing.unit * 2
    }
})
export const SignIn=withStyles(styles)(({
    updateSignIn,
    match,
    classes,
    ...signin
})=>(
    <Grid container xs={12} justify="center">
        <Card
            className={classes.card}
        >
            <CardContent>
                <Route 
                    path='/credentials/firsttime'
                    render={()=><FirstTimeRender signin={signin} updateSignIn={updateSignIn}/>}
                />
                <Route 
                    path='/credentials/password'
                    render={()=><OnlyPassword signin={signin} updateSignIn={updateSignIn}/>}
                />
                <Route 
                    path='/credentials/updatewallet'
                    render={()=><OnlyLightningNodeInfo signin={signin} updateSignIn={updateSignIn}/>}
                />
            </CardContent>
            <CardActions>
                <ConnectButton 
                    variant="contained" color="primary"
                    disabled={notAllItemsExist(signin)}
                >
                    Connect
                </ConnectButton>
            </CardActions>
        </Card>
    </Grid>
))
SignIn.propTypes={
    [MACAROON_KEY]:PropTypes.string.isRequired,
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