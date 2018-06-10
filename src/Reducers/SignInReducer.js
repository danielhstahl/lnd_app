import { 
    ENTER_WALLET_PASSWORD, 
    ENTER_IP 
} from '../Actions/actionsDefinitions'
import {combineReducers} from 'react-redux'
const textReducerGenerator=type=>(state='', action)=>{
    switch(action.type){
        case type:
            return action.value
        default:
            return state    
    }
}

const password=textReducerGenerator(ENTER_WALLET_PASSWORD)
const ip=textReducerGenerator(ENTER_IP)
export default combineReducers({
    password,
    ip
})