import { ENTER_PAYMENT_REQUEST, RESET_PAYMENT_REQUEST } from "./actionDefinitions";
export const eventOrValue=eOrV=>{
    if(eOrV===null||eOrV===undefined){
        return eOrV
    }
    if(eOrV.target){
        return eOrV.target.value
    }
    else{
        return eOrV
    }
}
export const updatePaymentRequest=dispatch=>e=>{
    const value=eventOrValue(e)
    dispatch({
        type:ENTER_PAYMENT_REQUEST,
        value
    })
}

export const resetPaymentRequest=dispatch=>dispatch({
    type:RESET_PAYMENT_REQUEST,
    value:''
})
