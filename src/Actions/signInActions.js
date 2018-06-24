import { 
    ENTER_SIGN_IN,
    REMOVE_MACAROON,
    SET_ENCRYPTED_MACAROON
} from '../Actions/actionDefinitions'
import {eventOrValue} from 'utils/componentUtils'
import crypto from 'crypto'
export const updateSignIn=dispatch=>key=>e=>dispatch({
    type:ENTER_SIGN_IN,
    key,
    value:eventOrValue(e)
})

export const removeMacaroon=dispatch=>()=>{
    localStorage.removeItem('macaroon')
    dispatch({
        type:REMOVE_MACAROON
    })
}

export const setMacaroon=dispatch=>({macaroon, password})=>()=>{
    if(macaroon){
        const cipher = crypto.createCipher('aes192', password)
        const encryptedMacaroon= cipher.update(macaroon, 'utf8', 'hex')+cipher.final('hex')
        localStorage.setItem('macaroon', encryptedMacaroon)
        return dispatch({
            type:SET_ENCRYPTED_MACAROON,
            value:encryptedMacaroon
        })
    }
    return {}
}