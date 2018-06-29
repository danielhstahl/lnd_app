import { ENTER_PAYMENT_REQUEST, RESET_PAYMENT_REQUEST } from "./actionDefinitions";
import {eventOrValue} from 'utils/componentUtils'
export const updatePaymentRequest=dispatch=>e=>{
    const value=eventOrValue(e)
    console.log(value)
    if(value){
        dispatch({
            type:ENTER_PAYMENT_REQUEST,
            value
        })
    }
    
}

export const resetPaymentRequest=dispatch=>dispatch({
    type:RESET_PAYMENT_REQUEST,
    value:''
})
