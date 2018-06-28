import {
    ATTEMPT_CONNECT, 
    CONNECT_FAILED,
    CONNECT_LOCKED,
    CONNECT_UNLOCKED,
    GET_INFO,
    GET_BALANCE,
    GET_TRANSACTIONS,
    JUST_UPDATED,
    GET_INVOICES,
    PASSWORD_RESET,
    PASSWORD_ERROR
} from './actionDefinitions'
import crypto from 'crypto'
import {delay} from '../utils/componentUtils'
import { convertBTCToSatoshi } from 'utils/btcUtils'
const formUrl=(hostname, ...extensions)=>`https://${hostname}/v1/${extensions.join('/')}`

const getLightningRequest=({macaroon, method, endpoint, ...rest})=>{
    const headers = new Headers({
        "Grpc-Metadata-macaroon": macaroon
    })
    const requestData={ 
        method,
        headers,
        ...rest
    }
    return new Request(endpoint, requestData)
}
const trimStr=str=>str.trim()
const getMacaroon=({password, encryptedMacaroon})=>{
    const decipher = crypto.createDecipher('aes192', password)
    return decipher.update(encryptedMacaroon, 'hex', 'utf8')+ decipher.final('utf8')
}
const notifyTime=4000
const dispatchError=dispatch=>err=>{
    console.log(err)
    return dispatch({
        type:CONNECT_FAILED
    })
}
const connectFactory=fn=>dispatch=>({password, savedHostname, encryptedMacaroon, ...rest})=>()=>{
    let macaroon
    try{
        macaroon=getMacaroon({password, encryptedMacaroon})
    }
    catch(err){
        dispatch({
            type:PASSWORD_ERROR
        })
        setTimeout(()=>{
            dispatch({
                type:PASSWORD_RESET
            })
        }, notifyTime)
        return
    }
    dispatch({
        type:ATTEMPT_CONNECT,
        value:true
    })
    return fn(dispatch)({macaroon, hostname:savedHostname, ...rest})
        .then(()=>dispatch({
            type:ATTEMPT_CONNECT,
            value:false
        }))
}

const noConnection='Not Found'
const successfulUnlock='{"error":"context canceled","code":1}'//for some odd reason, unlocking returns this error even when successful

const hasNoConnection=txt=>txt===noConnection
const hasConnectionAndAlreadyUnlocked=txt=>txt!==noConnection&&txt!==successfulUnlock

const dispatchLockedIfNotFound=dispatch=>txt=>{
    if(hasNoConnection(txt)){
        dispatch({
            type:CONNECT_LOCKED
        })
    }
    return txt
}
const dispatchUnlockedIfNotUnlocking=dispatch=>txt=>{
    if(hasConnectionAndAlreadyUnlocked(txt)){ 
        dispatch({
            type:CONNECT_UNLOCKED
        })
    }
    return txt
}
const dispatchResultIfType=(dispatch, type)=>txt=>{
    if((!hasNoConnection(txt))&&type){
        dispatch({
            type,
            value:JSON.parse(txt)
        })
    }
    return txt
}

export const checkWhetherFound=(dispatch, type)=>res=>Promise.resolve(res.text())
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
        notifyTime
    )
}
const getBalanceLocal=dispatch=>({macaroon, hostname})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl(hostname, 'balance', 'blockchain')
    })
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_BALANCE))
}
/**three possible outcomes: no connection, connection but locked, connection and unlocked */
const checkConnectionLocal=dispatch=>({macaroon, hostname})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl(hostname, 'getinfo')
    })
    getBalanceLocal(dispatch)({macaroon, hostname})
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_INFO))
        .then(generateNotify(dispatch))
}

const unlockWalletLocal=dispatch=>({macaroon, walletPassword, hostname})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'POST', 
        endpoint:formUrl(hostname, 'unlockwallet'),
        body:JSON.stringify({wallet_password:btoa(walletPassword)})
    })
    return fetch(req) //oddly enough, returns {"error":"context canceled","code":1}
        .then(checkWhetherFound(dispatch)) //successfully unlocks
        .then(()=>delay(20000)) //apparently it takes a long time to unlock :|
        .then(()=>checkConnectionLocal(dispatch)({macaroon})) 
}

const getTransactionsLocal=dispatch=>({macaroon, hostname})=>{
    console.log(hostname)
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl(hostname, 'transactions')
    })
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_TRANSACTIONS))
}

const getInvoicesLocal=dispatch=>({macaroon, hostname})=>{
    console.log(hostname)
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl(hostname, 'invoices?pending_only=true')
    })
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_INVOICES))
}

const createInvoiceLocal=dispatch=>({macaroon, hostname, amount, memo})=>{
    console.log(convertBTCToSatoshi(amount))
    const req=getLightningRequest({
        macaroon, 
        method:'POST', 
        endpoint:formUrl(hostname, 'invoices'),
        body:JSON.stringify({value:convertBTCToSatoshi(amount), memo})
    })
    return fetch(req)
        .then(()=>getInvoicesLocal(dispatch)({macaroon, hostname}))
}
const sendPaymentLocal=dispatch=>({macaroon, hostname, paymentRequest})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'POST', 
        endpoint:formUrl(hostname, 'channels', 'transactions'),
        body:JSON.stringify({payment_request:paymentRequest})
    })
    return fetch(req)
        .then(()=>getInvoicesLocal(dispatch)({macaroon, hostname}))
}

export const checkConnection=connectFactory(checkConnectionLocal)
export const unlockWallet=connectFactory(unlockWalletLocal)
export const getBalance=connectFactory(getBalanceLocal)
export const getTransactions=connectFactory(getTransactionsLocal)
export const getInvoices=connectFactory(getInvoicesLocal)
export const createInvoice=connectFactory(createInvoiceLocal)
export const sendPayment=connectFactory(sendPaymentLocal)
