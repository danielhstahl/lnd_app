import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import {styles} from 'assets/jss/material-dashboard-react/views/table'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridItem from 'components/Grid/GridItem.jsx'
import ShowLockedMessage from '../components/Utils/ShowLockedMessage'
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardActions from '@material-ui/core/CardActions'
import {updatePaymentRequest} from 'Actions/paymentActions'
import {SendPaymentButton} from 'views/ConnectButton'
import {QRInputPaymentRequest, ToggleQRButton} from 'components/Utils/QRInput'

export const Payments=withStyles(styles)(({
    classes, paymentRequest
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
                        <QRInputPaymentRequest labelText="Payment Request" />
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
                        <ToggleQRButton/>
                    </CardActions>
                </Card>
            </GridItem>
        </Grid>
    </ShowLockedMessage>
))
Payments.propTypes={
    classes:PropTypes.object.isRequired,
    paymentRequest:PropTypes.string.isRequired,
    updatePaymentRequest:PropTypes.func.isRequired,
}
const mapStateToProps=({payment})=>({
    paymentRequest:payment
})

const mapDispatchToProps=dispatch=>({
    updatePaymentRequest:updatePaymentRequest(dispatch),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payments)