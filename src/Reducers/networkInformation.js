import {
    GET_INFO,
    GET_BALANCE,
    GET_TRANSACTIONS,
    GET_INVOICES,
    UPDATE_INVOICES
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
//const invoices=generateReducer(GET_INVOICES)
const invoices=(state={}, action)=>{
    switch(action.type){
        case GET_INVOICES:
            return action.value
        case UPDATE_INVOICES:
            return {...state, invoices:[...state.invoices, action.value]}
        default:
            return state
    }
}


export default combineReducers({
    generalInfo,
    balance,
    transactions,
    invoices
})