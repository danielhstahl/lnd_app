import React from 'react'
import { connect } from 'react-redux' 
import TextField from '@material-ui/core/TextField'
import {createInvoice} from 'Actions/connectActions'
import {updateInvoiceAmount} from 'Actions/invoiceActions'
import { convertBTCToSatoshi } from '../../utils/btcUtils'
import Button from 'components/CustomButtons/Button'
export const SubmitInvoice=({invoiceAmount, createInvoice, updateInvoiceAmount})=>[
    <TextField
        autoFocus
        margin="dense"
        type="number"
        fullWidth
        value={invoiceAmount}
        onChange={updateInvoiceAmount}
        key='invoiceamt'
    />,
    <Button onClick={createInvoice({value:convertBTCToSatoshi(invoiceAmount)})} key='submitinv'>Create</Button>
]
const mapStateToProps=({invoices})=>({
    invoiceAmount:invoices.amount
})
const mapDispatchToProps=dispatch=>({
    createInvoice:createInvoice(dispatch),
    updateInvoiceAmount:updateInvoiceAmount(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitInvoice)