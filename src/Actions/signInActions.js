import { 
    ENTER_SIGN_IN,
    REMOVE_MACAROON,
    SET_ENCRYPTED_MACAROON
} from '../Actions/actionDefinitions'
import crypto from 'crypto'
export const updateSignIn=dispatch=>key=>e=>dispatch({
    type:ENTER_SIGN_IN,
    key,
    value:e.target.value
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