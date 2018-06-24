import React from 'react'
import {QRInputMacaroon, ToggleQRButton} from 'components/Utils/QRInput'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardBody from 'components/Card/CardBody'
import GridItem from 'components/Grid/GridItem'
import CustomInput from "components/CustomInput/CustomInput.jsx"
import {ConnectButton} from './ConnectButton'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import UnlockWallet from './UnlockWallet'
import Button from 'components/CustomButtons/Button'
import { withStyles } from '@material-ui/core/styles'
import {updateSignIn, removeMacaroon} from '../Actions/signInActions'
import Grid from '@material-ui/core/Grid'

const notAllItemsExist=({macaroon, password})=>!(macaroon&&password)
const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
}
const formControlProps={fullWidth:true}

const getWhetherMacaroonExists=(macaroon, encryptedMacaroon)=>(macaroon||encryptedMacaroon)?true:false
const style={color:"primary"}
const SignIn=withStyles(styles)(({
    classes, macaroon, 
    password, encryptedMacaroon,
    updateSignIn, removeMacaroon,
    passwordError
})=>(
    <Grid container>
        <GridItem xs={12} sm={12} md={8}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Lightning Network Settings</h4>
                    <p className={classes.cardCategoryWhite}>The Macaroon will be encrypted with the supplied password</p>
                </CardHeader>
                <CardBody>
                    <Grid container>
                    <GridItem xs={12} sm={12} md={12}>
                        {encryptedMacaroon?
                        <Button onClick={removeMacaroon}>
                            Remove existing encrypted macaroon
                        </Button>:
                        <QRInputMacaroon labelText="Macaroon" />
                        }
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Password"
                            id="password"
                            formControlProps={formControlProps}
                            inputProps={{
                                value:password||'',
                                onChange:updateSignIn('password'),
                                type:'password'
                            }}
                            error={passwordError}
                        />
                    </GridItem>
                    </Grid>
                </CardBody>
                <CardActions>
                    <ConnectButton 
                        styles={{disabled:notAllItemsExist({
                            macaroon:getWhetherMacaroonExists(macaroon, encryptedMacaroon), password
                        }), ...style}}
                    >
                        {encryptedMacaroon?'Connect':'Save and Connect'}
                    </ConnectButton>
                    <ToggleQRButton styles={{disabled:encryptedMacaroon}}/>
                </CardActions>
                <UnlockWallet />
            </Card>
        </GridItem>
    </Grid>
))

SignIn.propTypes={
    macaroon:PropTypes.string,
    password:PropTypes.string,
    updateSignIn:PropTypes.func.isRequired,
    encryptedMacaroon:PropTypes.string,
    removeMacaroon:PropTypes.func.isRequired,
    classes:PropTypes.shape({
        cardTitleWhite:PropTypes.string.isRequired,
        cardCategoryWhite:PropTypes.string.isRequired
    }).isRequired
}

const mapStateToProps=({signin, encryptedMacaroon, passwordError})=>({
    encryptedMacaroon,
    ...signin,
    passwordError
})
const mapDispatchToProps=dispatch=>({
    updateSignIn:updateSignIn(dispatch),
    removeMacaroon:removeMacaroon(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)