import { SET_CURRENT_PAYMENT_REQUEST, ENTER_INVOICE, RESET_INVOICE } from "../Actions/actionDefinitions"
export const paymentRequest=(state='', action)=>{
    switch(action.type){
        case SET_CURRENT_PAYMENT_REQUEST:
            return action.value
        default:
            return state
    }
}
export default (state={}, action)=>{
    switch(action.type){
        case ENTER_INVOICE:
            return {...state, [action.key]:action.value}
        case RESET_INVOICE:
            return {}
        default:
            return state
    }
}
