import {
    ATTEMPT_CONNECT, 
    CONNECT_FAILED,
    CONNECT_LOCKED,
    CONNECT_UNLOCKED
} from './actionDefinitions'
import crypto from 'crypto'
import {signInKeys} from '../Components/signInDefinitions'
//import {NO_CONNECTION, CONNECTION_BUT_LOCKED, CONNECTION_UNLOCKED} from '../Reducers/ConnectReducer'
//const formUrl=(ip, port)=>(...extensions)=>`https://${ip}:${port}/v1/${extensions.join('/')}`
const formUrl=(ip, port)=>(...extensions)=>`http://${ip}:${port}/v1/${extensions.join('/')}`

const getLightningRequest=({macaroon, method, endpoint, origin, body})=>{
    const headers = new Headers({
        "Grpc-Metadata-macaroon": macaroon,
        Origin:origin
    })//myResponse.headers.set("Origin", "http://mybank.com")
    const requestData={ 
        method,
        headers,
        //mode: 'cors',
        body
    }
    return new Request(endpoint, requestData)
}
/**three possible outcomes: no connection, connection but locked, connection and unlocked */
export const checkConnection=dispatch=>({password, ...rest})=>()=>{
    dispatch({
        type:ATTEMPT_CONNECT,
        value:true
    })
    const {ip, port, macaroon}=rest
    const cipher = crypto.createCipher('aes192', password)
    Object.entries(rest).forEach(([key, value])=>{
        if(signInKeys[key]){
            localStorage.setItem(key, cipher.update(value, 'utf8', 'hex')+cipher.final('hex'))
        }
    })

    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl(ip, port)('getinfo'),
       // origin:ip
    })
    console.log(req)
    //console.log(macaroon)
    fetch(req).then(res=>{
        res.text().then(txt=>{
            console.log(txt)
        })
        //console.log(res.headers)
        dispatch({
            type:CONNECT_FAILED,
        })
    }).catch(err=>{
        console.log(err)
        dispatch({
            type:CONNECT_FAILED
        })
    }).finally(_=>{
        dispatch({
            type:ATTEMPT_CONNECT,
            value:false
        })
    })
}


export const walletUnlock=dispatch=>()=>{

}

export const getInfo=dispatch=>()=>{

}