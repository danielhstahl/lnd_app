import { 
    ENTER_SIGN_IN
} from '../Actions/actionDefinitions'
/*
const textActionGenerator=type=>dispatch=>e=>dispatch({
    type,
    value:e.target.value
})
export const updatePassword=textActionGenerator(ENTER_WALLET_PASSWORD)
export const updateIP=textActionGenerator(ENTER_IP)
*/
export const updateSignIn=dispatch=>key=>e=>dispatch({
    type:ENTER_SIGN_IN,
    key,
    value:e.target.value
})