import {ATTEMPT_CONNECT, CONNECT_FAILED} from './actionDefinitions'
import {crypto} from 'crypto'

export const getConnectionInformation=dispatch=>({password, ...rest})=>()=>{
    dispatch({
        type:ATTEMPT_CONNECT,
        value:true
    })
    const cipher = crypto.createCipher('aes192', password)
    Object.entries(rest).forEach(([key, value])=>{
        localStorage.setItem(key, cipher.update(value, 'utf8', 'hex')+cipher.final('hex'))
    })
    const {ip, port}=rest
    fetch(`http://${ip}:${port}/v1/getInfo`).then(res=>res.json()).then(res=>{
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