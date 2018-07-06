import React from 'react'
import CardFooter from 'components/Card/CardFooter'
import CardBody from 'components/Card/CardBody'
import GridItem from 'components/Grid/GridItem'
import CustomInput from "components/CustomInput/CustomInput.jsx"
import {UnlockWalletButton} from './ConnectButton'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import {updateSignIn} from '../Actions/signInActions'
import Grid from '@material-ui/core/Grid'
import {
    CONNECT_LOCKED
} from 'Actions/actionDefinitions'


const formControlProps={fullWidth:true}
const style={color:"primary"}
const UnlockWallet=({ walletPassword, updateSignIn, connectStatus})=>CONNECT_LOCKED===connectStatus?
    [
        <CardBody key='walletbody'>
            <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                        labelText="Wallet Password"
                        id="walletpassword"
                        formControlProps={formControlProps}
                        inputProps={{
                            value:walletPassword||'',
                            onChange:updateSignIn('walletPassword'),
                            type:'password'
                        }}
                    />
                </GridItem>
            </Grid>
        </CardBody>,
        <CardFooter key='walletfooter'>
            <UnlockWalletButton 
                styles={{disabled:!walletPassword, ...style}}
            >
                Unlock
            </UnlockWalletButton>
        </CardFooter>
    ]:null


UnlockWallet.propTypes={
    walletPassword:PropTypes.string,
    updateSignIn:PropTypes.func.isRequired
}

const mapStateToProps=({signin, connection})=>({
    connectStatus:connection.connectStatus,
    walletPassword:signin.walletPassword
})
const mapDispatchToProps=dispatch=>({
    updateSignIn:updateSignIn(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnlockWallet)