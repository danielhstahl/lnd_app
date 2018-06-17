import {
    ATTEMPT_CONNECT, 
    CONNECT_FAILED,
    CONNECT_LOCKED,
    CONNECT_UNLOCKED,
    GET_INFO,
    GET_BALANCE,
    GET_TRANSACTIONS,
    JUST_UPDATED,
    SET_ENCRYPTED_MACAROON
} from './actionDefinitions'
import crypto from 'crypto'
//import {encryptedMacaroon} from '../utils/localStorage'

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
const getMacaroon=dispatch=>({password, macaroon, encryptedMacaroon})=>{
    if(!macaroon){
        const decipher = crypto.createDecipher('aes192', password)
        return decipher.update(encryptedMacaroon, 'hex', 'utf8')+ decipher.final('utf8')
    }
    else{
        const cipher = crypto.createCipher('aes192', password)
        const encryptedMacaroon= cipher.update(macaroon, 'utf8', 'hex')+cipher.final('hex')
        localStorage.setItem('macaroon',encryptedMacaroon)
        dispatch({
            type:SET_ENCRYPTED_MACAROON,
            value:encryptedMacaroon
        })
        return macaroon
    }
}
const connectFactory=fn=>dispatch=>({password, macaroon, encryptedMacaroon, ...rest})=>()=>{
    const finalMacaroon=getMacaroon(dispatch)({password, macaroon, encryptedMacaroon})
    dispatch({
        type:ATTEMPT_CONNECT,
        value:true
    })
    return fn(dispatch)({macaroon:finalMacaroon, ...rest}).then(()=>{
        dispatch({
            type:ATTEMPT_CONNECT,
            value:false
        })
    })
}
const checkWhetherFound=(dispatch, type)=>res=>Promise.resolve(res.text())
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
            if(type){
                dispatch({
                    type,
                    value:JSON.parse(txt)
                })
            }
            
        }
    })
    .catch(err=>{
        console.log(err)
        dispatch({
            type:CONNECT_FAILED
        })
    })

const generateNotify=dispatch=>()=>{
    dispatch({
        type:JUST_UPDATED,
        value:true
    })
    setTimeout(()=>dispatch({
            type:JUST_UPDATED,
            value:false
        }),
        4000
    )
}
const getBalanceLocal=dispatch=>({macaroon})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl('balance', 'blockchain'),
        //body:JSON.stringify({wallet_password:walletPassword})
    })
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_BALANCE))
}
/**three possible outcomes: no connection, connection but locked, connection and unlocked */
const checkConnectionLocal=dispatch=>({macaroon})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl('getinfo')
    })
    getBalanceLocal(dispatch)({macaroon})
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_INFO))
        .then(generateNotify(dispatch))
}

const unlockWalletLocal=dispatch=>({macaroon, walletPassword})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'POST', 
        endpoint:formUrl('unlockwallet'),
        body:JSON.stringify({wallet_password:walletPassword})
    })
    return fetch(req)
        .then(checkWhetherFound(dispatch))
        .then(generateNotify(dispatch))
}

const getTransactionsLocal=dispatch=>({macaroon})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl('transactions')
    })
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_TRANSACTIONS))
        .then(generateNotify(dispatch))
}



export const checkConnection=connectFactory(checkConnectionLocal)

export const unlockWallet=connectFactory(unlockWalletLocal)
export const getBalance=connectFactory(getBalanceLocal)
export const getTransactions=connectFactory(getTransactionsLocal)


export const getInfo=dispatch=>()=>{

}