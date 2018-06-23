import { ENTER_INVOICE, RESET_INVOICE, SET_CURRENT_PAYMENT_REQUEST } from "./actionDefinitions";


export const updateInvoice=dispatch=>key=>e=>dispatch({
    type:ENTER_INVOICE,
    key,
    value:e.target.value
})

export const resetInvoice=dispatch=>dispatch({
    type:RESET_INVOICE
})

export const setCurrentPaymentRequest=dispatch=>value=>dispatch({
    type:SET_CURRENT_PAYMENT_REQUEST,
    value
})