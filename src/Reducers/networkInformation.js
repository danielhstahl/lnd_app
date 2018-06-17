import {
    GET_INFO,
} from '../Actions/actionDefinitions'
import {combineReducers} from 'redux'
const generalInfo=(state={}, action)=>{
    switch(action.type){
        case GET_INFO:
            return action.value
        default:
            return state
    }
}

export default combineReducers({
    generalInfo,
})