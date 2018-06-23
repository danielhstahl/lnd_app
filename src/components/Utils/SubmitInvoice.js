import React from 'react'
import { connect } from 'react-redux' 
import {updateInvoice} from 'Actions/invoiceActions'
import {CreateInvoiceButton} from 'views/ConnectButton'
import CustomInput from 'components/CustomInput/CustomInput'
const formControlProps={fullWidth:true}
const styles={color:'primary'}
export const SubmitInvoice=({amount, memo, updateInvoice})=>[
    <CustomInput
        inputProps={{
            value:amount, 
            onChange:updateInvoice('amount')
        }}
        key='invoiceamt'

        labelText='Enter Invoice Amount'
        formControlProps={formControlProps}
    />,
    <CustomInput
        inputProps={{
            value:memo, 
            onChange:updateInvoice('memo')
        }}
        key='memo'
        labelText='Enter Memo'
        formControlProps={formControlProps}
    />,
    <CreateInvoiceButton 
        styles={styles} 
        key='submitinv'
    >
        Create Invoice
    </CreateInvoiceButton>
]
const mapStateToProps=({invoice})=>invoice
const mapDispatchToProps=dispatch=>({
    updateInvoice:updateInvoice(dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitInvoice)