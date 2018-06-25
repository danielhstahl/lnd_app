import { 
    ENTER_SIGN_IN,
    REMOVE_MACAROON,
    SET_ENCRYPTED_MACAROON,
    REMOVE_HOSTNAME,
    SET_HOSTNAME
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
export const removeHostname=dispatch=>()=>{
    localStorage.removeItem('hostname')
    dispatch({
        type:REMOVE_HOSTNAME
    })
}
export const setHostname=dispatch=>({hostname})=>()=>{
    if(hostname){
        localStorage.setItem('hostname', hostname)
        dispatch({
            type:SET_HOSTNAME,
            value:hostname
        })
        return hostname
    }
    
}

export const setMacaroon=dispatch=>({macaroon, password})=>()=>{
    if(macaroon){
        const cipher = crypto.createCipher('aes192', password)
        const encryptedMacaroon= cipher.update(macaroon, 'utf8', 'hex')+cipher.final('hex')
        localStorage.setItem('macaroon', encryptedMacaroon)
        dispatch({
            type:SET_ENCRYPTED_MACAROON,
            value:encryptedMacaroon
        })
        return encryptedMacaroon
    }
}