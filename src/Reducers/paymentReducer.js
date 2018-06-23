import { ENTER_PAYMENT_REQUEST, RESET_PAYMENT_REQUEST } from "Actions/actionDefinitions";

export default (state='', action)=>{
    switch(action.type){
        case ENTER_PAYMENT_REQUEST:
            return action.value
        case RESET_PAYMENT_REQUEST:
            return ''
        default:
            return state
    }
}