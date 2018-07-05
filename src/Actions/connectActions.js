import {
    ATTEMPT_CONNECT, 
    CONNECT_FAILED,
    CONNECT_LOCKED,
    CONNECT_UNLOCKED,
    MESSAGE_DANGER,
    MESSAGE_SUCCESS,
    MESSAGE_WARNING,
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
        "Grpc-Metadata-macaroon": macaroon,
        'Content-Type': 'application/json'
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
const connectionFailed=dispatch=>()=>dispatch({
    type:CONNECT_FAILED
})
const dispatchWarning=dispatch=>err=>{
    generateNotify(dispatch)()
    return dispatch({
        type:MESSAGE_DANGER,
        value:err.message
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
const hasNoConnection=txt=>txt===noConnection
const isNotLocked=result=>result.status!=='locked'

const checkOtherError=result=>{
    if(result.error){
        throw new Error(result.error)
    }
    return result
}

const dispatchLockedIfNotFound=dispatch=>txt=>{
    if(hasNoConnection(txt)){
        dispatch({
            type:CONNECT_LOCKED
        })
        dispatch({
            type:MESSAGE_WARNING,
            value:'Connection succeeded, but wallet is locked'
        })
        return JSON.stringify({status:'locked'})
    }
    return txt
}
const dispatchUnlockedIfNotLocked=dispatch=>result=>{
    if(isNotLocked(result)){ 
        dispatch({
            type:CONNECT_UNLOCKED
        })
        dispatch({
            type:MESSAGE_SUCCESS,
            value:'Successful connection!'
        })
    }
    return result
}

const dispatchResultIfType=(dispatch, type)=>result=>{
    if(type&&isNotLocked(result)){
        dispatch({
            type,
            value:result
        })
    }
    return result
}

export const checkWhetherFound=(dispatch, type)=>res=>Promise.resolve(res.text())
    .then(trimStr)
    .then(dispatchLockedIfNotFound(dispatch))
    .then(JSON.parse)
    .then(dispatchUnlockedIfNotLocked(dispatch))
    .then(checkOtherError)
    .then(dispatchResultIfType(dispatch, type))

export const checkErrorOnPost=res=>Promise.resolve(res.text())
    .then(trimStr)
    .then(JSON.parse)
    .then(checkOtherError)

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
        .catch(err=>{
            dispatchWarning(dispatch)(err)
            connectionFailed(dispatch)()
        })
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
        .catch(dispatchWarning(dispatch))
        .then(()=>delay(20000)) //apparently it takes a long time to unlock :|
        .then(()=>checkConnectionLocal(dispatch)({macaroon})) 
}

const getTransactionsLocal=dispatch=>({macaroon, hostname})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl(hostname, 'transactions')
    })
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_TRANSACTIONS))
        .catch(dispatchWarning(dispatch))
}

const getInvoicesLocal=dispatch=>({macaroon, hostname})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'GET', 
        endpoint:formUrl(hostname, 'invoices?pending_only=true')
    })
    return fetch(req)
        .then(checkWhetherFound(dispatch, GET_INVOICES))
        .catch(dispatchWarning(dispatch))
}

const createInvoiceLocal=dispatch=>({macaroon, hostname, amount, memo})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'POST', 
        endpoint:formUrl(hostname, 'invoices'),
        body:JSON.stringify({value:convertBTCToSatoshi(amount), memo})
    })
    return fetch(req)
        .then(checkErrorOnPost)
        .then(()=>getInvoicesLocal(dispatch)({macaroon, hostname}))
        .catch(dispatchWarning(dispatch))
        
}
const sendPaymentLocal=dispatch=>({macaroon, hostname, paymentRequest})=>{
    const req=getLightningRequest({
        macaroon, 
        method:'POST', 
        endpoint:formUrl(hostname, 'channels', 'transactions'),
        body:JSON.stringify({payment_request:paymentRequest})
    })
    return fetch(req)
        .then(checkErrorOnPost)
        //.then(()=>getInvoicesLocal(dispatch)({macaroon, hostname}))
        .catch(dispatchWarning(dispatch))
        
}

export const checkConnection=connectFactory(checkConnectionLocal)
export const unlockWallet=connectFactory(unlockWalletLocal)
export const getBalance=connectFactory(getBalanceLocal)
export const getTransactions=connectFactory(getTransactionsLocal)
export const getInvoices=connectFactory(getInvoicesLocal)
export const createInvoice=connectFactory(createInvoiceLocal)
export const sendPayment=connectFactory(sendPaymentLocal)
