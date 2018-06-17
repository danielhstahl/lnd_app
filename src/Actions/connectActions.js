import {
    ATTEMPT_CONNECT, 
    CONNECT_FAILED,
    CONNECT_LOCKED,
    CONNECT_UNLOCKED,
    GET_INFO,
    JUST_UPDATED
} from './actionDefinitions'
import crypto from 'crypto'
import {signInKeys} from '../Components/signInDefinitions'
const {MACAROON_KEY}=signInKeys
//import {NO_CONNECTION, CONNECTION_BUT_LOCKED, CONNECTION_UNLOCKED} from '../Reducers/ConnectReducer'
//const formUrl=(ip, port)=>(...extensions)=>`https://${ip}:${port}/v1/${extensions.join('/')}`
const formUrl=(...extensions)=>`/v1/${extensions.join('/')}`

const getLightningRequest=({macaroon, method, endpoint, origin, body})=>{
    const headers = new Headers({
        "Grpc-Metadata-macaroon": macaroon,
        Origin:origin
    })
    const requestData={ 
        method,
        headers,
        body
    }
    return new Request(endpoint, requestData)
}
const trimStr=str=>str.trim()
const encryptedMacaroon=localStorage.getItem(MACAROON_KEY)
const getMacaroon=({password, macaroon})=>{
    if(!macaroon){
        const decipher = crypto.createDecipher('aes192', password)
        return decipher.update(encryptedMacaroon, 'hex', 'utf8')+ decipher.final('utf8')
    }
    else{
        const cipher = crypto.createCipher('aes192', password)
        localStorage.setItem(MACAROON_KEY, cipher.update(macaroon, 'utf8', 'hex')+cipher.final('hex'))
        return macaroon
    }
}
const connectFactory=fn=>dispatch=>({password, macaroon})=>()=>{
    const finalMacaroon=getMacaroon({password, macaroon})
    return fn(dispatch)(finalMacaroon)
}
/**three possible outcomes: no connection, connection but locked, connection and unlocked */
const checkConnectionLocal=dispatch=>macaroon=>{
    dispatch({
        type:ATTEMPT_CONNECT,
        value:true
    })
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl('getinfo')
    })
    console.log(macaroon)
    //console.log(macaroon)
    fetch(req)
        .then(res=>res.text())
        .then(trimStr)
        .then(txt=>{
            console.log(txt)
            if(txt==='Not Found'){
                dispatch({
                    type:CONNECT_LOCKED
                })
            }
            else{
                dispatch({
                    type:CONNECT_UNLOCKED
                })
                dispatch({
                    type:GET_INFO,
                    value:JSON.parse(txt)
                })
            }
        })
        .catch(err=>{
            console.log(err)
            dispatch({
                type:CONNECT_FAILED
            })
        })
        .finally(_=>{
            dispatch({
                type:ATTEMPT_CONNECT,
                value:false
            })
            dispatch({
                type:JUST_UPDATED,
                value:true
            })
            setTimeout(()=>dispatch({
                    type:JUST_UPDATED,
                    value:false
                }),
                2000
            )
        })
}
export const checkConnection=connectFactory(checkConnectionLocal)

export const walletUnlock=dispatch=>()=>{

}

export const getInfo=dispatch=>()=>{

}