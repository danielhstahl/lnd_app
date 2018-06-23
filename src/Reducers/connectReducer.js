import { 
    ATTEMPT_CONNECT, 
    CONNECT_FAILED,
    CONNECT_LOCKED,
    CONNECT_UNLOCKED,
    JUST_UPDATED
} from '../Actions/actionDefinitions'
import {combineReducers} from 'redux'

/**Four possible statuses...no attempt, attempt and no connection, connection but locked, connection and unlocked */
export const NO_ATTEMPT='NO_ATTEMPT'
export const NO_CONNECTION='NO_CONNECTION'
export const CONNECTION_BUT_LOCKED='CONNECTION_BUT_LOCKED'
export const CONNECTION_UNLOCKED='CONNECTION_UNLOCKED'
const connectionStatus=(state=NO_ATTEMPT, action)=>{
    switch(action.type){
        case CONNECT_FAILED:
            return NO_CONNECTION
        case CONNECT_LOCKED:
            return CONNECTION_BUT_LOCKED
        case CONNECT_UNLOCKED:
            return CONNECTION_UNLOCKED
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
    connectionStatus,
    justUpdated
})