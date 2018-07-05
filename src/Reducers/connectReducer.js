import { 
    ATTEMPT_CONNECT, 
    CONNECT_FAILED,
    CONNECT_LOCKED,
    CONNECT_UNLOCKED,
    CONNECT_NO_ATTEMPT,
    JUST_UPDATED,
    MESSAGE_DANGER,
    MESSAGE_WARNING,
    MESSAGE_SUCCESS
} from '../Actions/actionDefinitions'
import {combineReducers} from 'redux'
import {
    MUI_SUCCESS, 
    MUI_WARNING, 
    MUI_DANGER,
    MUI_INFO
} from 'utils/componentUtils'


const defaultStatus={
    status:MUI_INFO,
    message:'No attempt to connect'
}

const messageStatus=(state=defaultStatus, action)=>{
    switch(action.type){
        case MESSAGE_DANGER:
            return {
                status:MUI_DANGER,
                message:action.value
            }
        case MESSAGE_WARNING:
            return {
                status:MUI_WARNING,
                message:action.value
            }
        case MESSAGE_SUCCESS:
            return {
                status:MUI_SUCCESS,
                message:action.value
            }
        default:
            return state
    }
}

const connectStatus=(state=CONNECT_NO_ATTEMPT, action)=>{
    switch(action.type){
        case CONNECT_FAILED:
            return CONNECT_FAILED
        case CONNECT_UNLOCKED:
            return CONNECT_UNLOCKED
        case CONNECT_LOCKED:
            return CONNECT_LOCKED
        default:
            return state
    }
}

const boolReducerGenerator=type=>(state=false, action)=>{
    switch(action.type){
        case type:
            return action.value
        default:
            return state    
    }
}
const isConnecting=boolReducerGenerator(ATTEMPT_CONNECT)
const justUpdated=boolReducerGenerator(JUST_UPDATED)
export default combineReducers({
    isConnecting,
    messageStatus,
    connectStatus,
    justUpdated
})