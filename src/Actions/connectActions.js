import {
    ATTEMPT_CONNECT, 
    CONNECT_FAILED,
    CONNECT_LOCKED,
    CONNECT_UNLOCKED,
    GET_INFO,
    GET_BALANCE,
    GET_TRANSACTIONS,
    JUST_UPDATED
} from './actionDefinitions'
import crypto from 'crypto'
import {delay} from '../utils/componentUtils'
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
const getMacaroon=({password, encryptedMacaroon})=>{
    const decipher = crypto.createDecipher('aes192', password)
    return decipher.update(encryptedMacaroon, 'hex', 'utf8')+ decipher.final('utf8')
}
const connectFactory=fn=>dispatch=>({password, encryptedMacaroon, ...rest})=>()=>{
    const macaroon=getMacaroon({password, encryptedMacaroon})
    dispatch({
        type:ATTEMPT_CONNECT,
        value:true
    })
    return fn(dispatch)({macaroon, ...rest})
        .then(()=>dispatch({
            type:ATTEMPT_CONNECT,
            value:false
        }))
}
const dispatchLockedIfNotFound=dispatch=>txt=>{
    if(txt==='Not Found'){
        dispatch({
            type:CONNECT_LOCKED
        })
    }
    return txt
}
const dispatchUnlockedIfNotUnlocking=dispatch=>txt=>{
    if(txt!=='Not Found'&&txt!=='{"error":"context canceled","code":1}'){ //for some odd reason, unlocking returns this error
        dispatch({
            type:CONNECT_UNLOCKED
        })
    }
    return txt
}
const dispatchResultIfType=(dispatch, type)=>txt=>{
    console.log(txt)
    if(txt!=='Not Found'&&type){
        dispatch({
            type,
            value:JSON.parse(txt)
        })
    }
}
const dispatchError=dispatch=>err=>{
    console.log(err)
    dispatch({
        type:CONNECT_FAILED
    })
}
const checkWhetherFound=(dispatch, type)=>res=>Promise.resolve(res.text())
    .then(trimStr)
    .then(dispatchLockedIfNotFound(dispatch))
    .then(dispatchUnlockedIfNotUnlocking(dispatch))
    .then(dispatchResultIfType(dispatch, type))
    .catch(dispatchError(dispatch))

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
        body:JSON.stringify({wallet_password:btoa(walletPassword)})
    })
    return fetch(req) //oddly enough, returns {"error":"context canceled","code":1}
        .then(checkWhetherFound(dispatch)) //successfully unlocks
        .then(()=>delay(20000))
        .then(()=>checkConnectionLocal(dispatch)({macaroon})) //but then this fails.  Does it take some time to unlock??
}

const getTransactionsLocal=dispatch=>({macaroon})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl('transactions')
    })
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_TRANSACTIONS))
}

export const checkConnection=connectFactory(checkConnectionLocal)
export const unlockWallet=connectFactory(unlockWalletLocal)
export const getBalance=connectFactory(getBalanceLocal)
export const getTransactions=connectFactory(getTransactionsLocal)


export const getInfo=dispatch=>()=>{

}