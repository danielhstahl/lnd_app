import { 
    ATTEMPT_CONNECT, 
    CONNECT_FAILED 
} from '../Actions/actionsDefinitions'

const boolReducerGenerator=type=>(state=false, action)=>{
    switch(action.type){
        case type:
            return action.value
        default:
            return state    
    }
}

const isConnecting=boolReducerGenerator(ATTEMPT_CONNECT)
const connectionFailed=boolReducerGenerator(CONNECT_FAILED)
export default combineReducers({
    isConnecting,
    connectionFailed
})