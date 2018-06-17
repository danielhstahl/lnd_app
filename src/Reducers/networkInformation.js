import {
    GET_INFO,
    GET_BALANCE,
    GET_TRANSACTIONS
} from '../Actions/actionDefinitions'
import {combineReducers} from 'redux'

const generateReducer=type=>(state={}, action)=>{
    switch(action.type){
        case type:
            console.log(action.value)
            return action.value
        default:
            return state
    }
}
const generalInfo=generateReducer(GET_INFO)
const balance=generateReducer(GET_BALANCE)
const transactions=generateReducer(GET_TRANSACTIONS)


export default combineReducers({
    generalInfo,
    balance,
    transactions
})