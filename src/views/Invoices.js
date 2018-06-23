import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import {styles} from 'assets/jss/material-dashboard-react/views/table'
import SubmitInvoice from 'components/Utils/SubmitInvoice'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import {getInvoices} from 'Actions/connectActions'
import Button from 'components/CustomButtons/Button'
import GridItem from 'components/Grid/GridItem.jsx'
import Table from 'components/Table/Table'
import AsyncHOC from "components/Utils/AsyncHOC"
import QRView from 'components/Utils/QRView'
import ShowLockedMessage from '../components/Utils/ShowLockedMessage'
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import {toggleQRShow} from 'Actions/qrActions'
import {setCurrentPaymentRequest} from 'Actions/invoiceActions'
import { convertSatoshiToBTC, convertDateToString, convertNixTimestamp } from '../utils/btcUtils'
const columnNames=['memo', 'request', 'amount', 'created date']
const parseData=({invoices}, showQR)=>invoices?invoices.map(({memo, payment_request, value, creation_date})=>[
    memo,
    <Button onClick={showQR(payment_request)}>View request</Button>, 
    convertSatoshiToBTC(value),
    convertDateToString(convertNixTimestamp(creation_date))
]):[]
const marginTop={marginTop:16}
export const PendingInvoices=withStyles(styles)(({
    invoices, encryptedMacaroon, 
    password, classes, 
    getInvoices, showQR,
    paymentRequest
})=>(
    <ShowLockedMessage>
        <AsyncHOC onLoad={getInvoices({password, encryptedMacaroon})}>
            <Grid container>
            <QRView qrRaw={paymentRequest}/>
            <GridItem xs={12} sm={12} md={8}>
                <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Invoices</h4>
                    <p className={classes.cardCategoryWhite}>
                    Invoices for this account
                    </p>
                </CardHeader>
                <CardBody>
                    <SubmitInvoice/>
                    <Divider style={marginTop}/>
                    <Table
                        tableHeaderColor="primary"
                        tableHead={columnNames}
                        tableData={parseData(invoices, showQR)}
                    />
                </CardBody>
                </Card>
            </GridItem>
            </Grid>
        </AsyncHOC>
    </ShowLockedMessage>
))

const mapStateToProps=({paymentRequest, network, encryptedMacaroon, signin})=>({
    password:signin.password,
    encryptedMacaroon,
    invoices:network.invoices,
    paymentRequest
})
const showQR=dispatch=>paymentRequest=>()=>{
    toggleQRShow(dispatch)()
    setCurrentPaymentRequest(dispatch)(paymentRequest)
}
const mapDispatchToProps=dispatch=>({
    showQR:showQR(dispatch),
    getInvoices:getInvoices(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingInvoices)