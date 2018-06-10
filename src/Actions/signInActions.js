import { 
    ENTER_WALLET_PASSWORD, 
    ENTER_IP 
} from '../Actions/actionDefinitions'

const textActionGenerator=type=>dispatch=>e=>dispatch({
    type,
    value:e.target.value
})
export const updatePassword=textActionGenerator(ENTER_WALLET_PASSWORD)
export const updateIP=textActionGenerator(ENTER_IP)