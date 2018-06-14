import { 
    ENTER_SIGN_IN 
} from '../Actions/actionDefinitions'
/*
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
})*/

export default (state={}, action)=>{
    switch(action.type){
        case ENTER_SIGN_IN:
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}