import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import {styles} from 'assets/jss/material-dashboard-react/views/table'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridItem from 'components/Grid/GridItem.jsx'
import ShowLockedMessage from '../components/Utils/ShowLockedMessage'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardActions from '@material-ui/core/CardActions'
import QrReader from 'react-qr-reader'
import Button from 'components/CustomButtons/Button'
import {updatePaymentRequest} from 'Actions/paymentActions'
import {SendPaymentButton} from 'views/ConnectButton'
import {
    toggleQRRaw
} from 'Actions/qrActions'
const formControlProps={fullWidth:true}
const style={width:'60%', margin: 'auto'}
export const Payments=withStyles(styles)(({
    classes, paymentRequest,
    showRaw, updatePaymentRequest,
    toggleRaw
})=>(
    <ShowLockedMessage>
        <Grid container>
            <GridItem xs={12} sm={12} md={8}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Payments</h4>
                        <p className={classes.cardCategoryWhite}>
                        Make a Payment
                        </p>
                    </CardHeader>
                    <CardBody profile>
                    {showRaw?<CustomInput 
                        labelText="Payment Request" 
                        inputProps={{
                            value:paymentRequest, 
                            multiline:true,
                            onChange:updatePaymentRequest
                        }}
                        formControlProps={formControlProps}
                        />:
                        <QrReader 
                            style={style} 
                            onError={err=>console.log(err)}
                            onScan={updatePaymentRequest}
                        />
                        }
                    </CardBody>
                    <CardActions>
                        <SendPaymentButton
                            style={{
                                disabled:!paymentRequest,
                                color:'primary'
                            }} 
                        >
                            Submit
                        </SendPaymentButton>
                        <Button color='primary' onClick={toggleRaw}>{showRaw?'Scan QR':'Show Hash'}</Button>
                    </CardActions>
                </Card>
            </GridItem>
        </Grid>
    </ShowLockedMessage>
))
Payments.propTypes={
    classes:PropTypes.object.isRequired,
    paymentRequest:PropTypes.string.isRequired,
    showRaw:PropTypes.bool.isRequired,
    updatePaymentRequest:PropTypes.func.isRequired,
    toggleRaw:PropTypes.func.isRequired
}
const mapStateToProps=({qr, payment})=>({
    showRaw:qr.showRaw,
    paymentRequest:payment
})

const mapDispatchToProps=dispatch=>({
    updatePaymentRequest:updatePaymentRequest(dispatch),
    toggleRaw:toggleQRRaw(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payments)