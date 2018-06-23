import { SET_CURRENT_INVOICE_AMOUNT, SET_CURRENT_PAYMENT_REQUEST } from "./actionDefinitions";


export const updateInvoiceAmount=dispatch=>e=>dispatch({
    type:SET_CURRENT_INVOICE_AMOUNT,
    value:e.target.value
})

export const resetInvoiceAmount=dispatch=>dispatch({
    type:SET_CURRENT_INVOICE_AMOUNT,
    value:''
})

export const setCurrentPaymentRequest=dispatch=>value=>dispatch({
    type:SET_CURRENT_PAYMENT_REQUEST,
    value
})