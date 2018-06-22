import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import Button from "components/CustomButtons/Button"
import { Link } from 'react-router-dom'
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
import {CONNECTION_UNLOCKED} from '../Reducers/connectReducer'
import {styles} from 'assets/jss/material-dashboard-react/views/table'
import ShowLockedMessage from '../components/Utils/ShowLockedMessage'


const columnNames=['tx_hash', 'amount', 'confirmations', 'time', 'fees']
const parseData=({invoices})=>invoices?invoices.map(({tx_hash, amount, num_confirmations, time_stamp, total_fees})=>[
    tx_hash,
    convertBTC(amount), 
    num_confirmations,
    (new Date(convertNixTimestamp(time_stamp))).toLocaleDateString("en-US"),
    convertBTC(total_fees)
]):[]
export const Invoices=withStyles(styles)(({invoices, encryptedMacaroon, password, classes, getInvoices})=>(
<ShowLockedMessage>
    <AsyncHOC onLoad={getInvoices({password, encryptedMacaroon})}>
        <Grid container>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Transactions</h4>
                <p className={classes.cardCategoryWhite}>
                All transactions for this account
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