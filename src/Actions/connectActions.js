import {ATTEMPT_CONNECT, CONNECT_FAILED} from './actionDefinitions'
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'
export const getConnectionInformation=dispatch=>({ipAddress, walletPassword})=>()=>{
    dispatch({
        type:ATTEMPT_CONNECT,
        value:true
    })
    localStorage.setItem('ipAddress', ipAddress)
    localStorage.setItem('walletPassword', walletPassword)
    fetch(`http://${ipAddress}/info`).then(res=>res.json()).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
    //connect to gRPC of light wallet here
    /*fetch({url:`${ipAddress}/unlock_wallet`, type:'POST', body:{wallet_password:walletPassword}}).then(res=>res.json()).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })*/
}