import React from 'react'

import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardFooter from 'components/Card/CardFooter'
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
    updateSignIn, removeMacaroon
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
                        <CustomInput
                            labelText="Macaroon"
                            id="macaroon"
                            formControlProps={formControlProps}
                            inputProps={{
                                value:macaroon,
                                onChange:updateSignIn('macaroon'),
                                multiline:true
                            }}
                        />}
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
                        />
                    </GridItem>
                    </Grid>
                </CardBody>
                <CardFooter>
                    <ConnectButton 
                        styles={{disabled:notAllItemsExist({
                            macaroon:getWhetherMacaroonExists(macaroon, encryptedMacaroon), password
                        }), ...style}}
                    >
                        {encryptedMacaroon?'Connect':'Save and Connect'}
                    </ConnectButton>
                </CardFooter>
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

const mapStateToProps=({signin, encryptedMacaroon})=>({
    encryptedMacaroon,
    ...signin
})
const mapDispatchToProps=dispatch=>({
    updateSignIn:updateSignIn(dispatch),
    removeMacaroon:removeMacaroon(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)