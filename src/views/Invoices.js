import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
// core components
import {convertBTC, convertNixTimestamp} from '../utils/btcUtils'
import GridItem from "components/Grid/GridItem.jsx"
import Table from 'components/Table/Table'
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import AsyncHOC from "components/Utils/AsyncHOC"
import {getInvoices} from '../Actions/connectActions'
import {styles} from 'assets/jss/material-dashboard-react/views/table'
import ShowLockedMessage from '../components/Utils/ShowLockedMessage'


const columnNames=['memo', 'request', 'amount', 'created date']
const parseData=({invoices})=>invoices?invoices.map(({memo, payment_request, value, creation_date, })=>[
    memo,
    payment_request, 
    convertBTC(value),
    (new Date(convertNixTimestamp(creation_date))).toLocaleDateString("en-US")
]):[]
export const Invoices=withStyles(styles)(({invoices, encryptedMacaroon, password, classes, getInvoices})=>(
<ShowLockedMessage>
    <AsyncHOC onLoad={getInvoices({password, encryptedMacaroon})}>
        <Grid container>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Invoices</h4>
                <p className={classes.cardCategoryWhite}>
                Invoices for this account
                </p>
            </CardHeader>
            <CardBody>
                <Table
                tableHeaderColor="primary"
                tableHead={columnNames}
                tableData={parseData(invoices)}
                />
            </CardBody>
            </Card>
        </GridItem>
        </Grid>
    </AsyncHOC>
</ShowLockedMessage>
))
Invoices.propTypes={
    encryptedMacaroon:PropTypes.string,
    password:PropTypes.string,
    classes:PropTypes.shape({
        cardTitleWhite:PropTypes.string.isRequired,
        cardCategoryWhite:PropTypes.string.isRequired
    }).isRequired,
    getInvoices:PropTypes.func.isRequired
}

const mapStateToProps=({signin, network, encryptedMacaroon})=>({
    password:signin.password,
    encryptedMacaroon,
    invoices:network.invoices
})

const mapDispatchToProps=dispatch=>({
    getInvoices:getInvoices(dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invoices)