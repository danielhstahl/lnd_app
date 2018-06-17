import { 
    ENTER_SIGN_IN,
    REMOVE_MACAROON,
    SET_ENCRYPTED_MACAROON
} from '../Actions/actionDefinitions'
import {encryptedMacaroon} from '../utils/localStorage'
export const encryptedMacaroonReducer=(state=encryptedMacaroon, action)=>{
    switch(action.type){
        case REMOVE_MACAROON:
            return ''
        case SET_ENCRYPTED_MACAROON:
            return action.value
        default:
            return state
    }
}

export default (state={}, action)=>{
    switch(action.type){
        case ENTER_SIGN_IN:
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}