import { 
    ENTER_SIGN_IN,
    REMOVE_MACAROON
} from '../Actions/actionDefinitions'

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