import { SET_CURRENT_PAYMENT_REQUEST, SET_CURRENT_INVOICE_AMOUNT } from "../Actions/actionDefinitions"
import {combineReducers} from 'redux'
const paymentRequest=(state='', action)=>{
    switch(action.type){
        case SET_CURRENT_PAYMENT_REQUEST:
            return action.value
        default:
            return state
    }
}
const amount=(state='', action)=>{
    switch(action.type){
        case SET_CURRENT_INVOICE_AMOUNT:
            return action.value
        default:
            return state
    }
}
export default combineReducers({
    paymentRequest,
    amount
})
