import { 
    ENTER_WALLET_PASSWORD, 
    ENTER_IP 
} from '../Actions/actionDefinitions'
import {combineReducers} from 'redux'
const textReducerGenerator=(type, defaultState)=>(state=defaultState, action)=>{
    switch(action.type){
        case type:
            return action.value
        default:
            return state    
    }
}

const password=textReducerGenerator(ENTER_WALLET_PASSWORD, localStorage.getItem('walletPassword'))
const ip=textReducerGenerator(ENTER_IP, localStorage.getItem('ipAddress'))
export default combineReducers({
    password,
    ip
})