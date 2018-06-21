import React from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types'
import Button from "components/CustomButtons/Button"
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
// core components
import {convertBTC, convertNixTimestamp} from '../utils/btcUtils'
import GridItem from "components/Grid/GridItem.jsx"
import Table from 'components/Table/Table'
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import AsyncHOC from "components/Utils/AsyncHOC"
import {getTransactions} from '../Actions/connectActions'
import {CONNECTION_UNLOCKED} from '../Reducers/connectReducer'
import {styles} from 'assets/jss/material-dashboard-react/views/table'
import StandardLightningError from './StandardLightningError'

const columnNames=['tx_hash', 'amount', 'confirmations', 'time', 'fees']
const parseData=({transactions})=>transactions?transactions.map(({tx_hash, amount, num_confirmations, time_stamp, total_fees})=>[
    tx_hash,
    convertBTC(amount), 
    num_confirmations,
    (new Date(convertNixTimestamp(time_stamp))).toLocaleDateString("en-US"),
    convertBTC(total_fees)
]):[]
export const Transactions=withStyles(styles)(({connectionStatus, transactions, encryptedMacaroon, password, classes, getTransactions})=>connectionStatus===CONNECTION_UNLOCKED?(
    <AsyncHOC onLoad={getTransactions({password, encryptedMacaroon})}>
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
                tableData={parseData(transactions)}
                />
            </CardBody>
            </Card>
        </GridItem>
        </Grid>
    </AsyncHOC>
):<StandardLightningError classes={classes}/>)
Transactions.propTypes={
    connectionStatus:PropTypes.string.isRequired,
    transactions:PropTypes.shape({
        transactions:PropTypes.arrayOf(PropTypes.shape({
            tx_hash:PropTypes.string.isRequired,
            amount:PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
            num_confirmations:PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
            time_stamp:PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
            total_fees:PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired
        }))
    }),
    encryptedMacaroon:PropTypes.string,
    password:PropTypes.string,
    classes:PropTypes.shape({
        cardTitleWhite:PropTypes.string.isRequired,
        cardCategoryWhite:PropTypes.string.isRequired
    }).isRequired,
    getTransactions:PropTypes.func.isRequired
}

const mapStateToProps=({signin, connection, network, encryptedMacaroon})=>({
    password:signin.password,
    encryptedMacaroon,
    transactions:network.transactions,
    connectionStatus:connection.connectionStatus
})

const mapDispatchToProps=dispatch=>({
    getTransactions:getTransactions(dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Transactions)

