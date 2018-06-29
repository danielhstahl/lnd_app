import { TOGGLE_QR, SET_SHOW_RAW, SET_SHOW_RAW_MACAROON } from "../Actions/actionDefinitions"
import {combineReducers} from 'redux'

const generateBool=(defaultState, type)=>(state=defaultState, action)=>{
    switch(action.type){
        case type:
            return !state
        default:
            return state
    }
}
const generateBoolSet=(defaultState, type)=>(state=defaultState, action)=>{
    switch(action.type){
        case type:
            return action.value
        default:
            return state
    }
}

const open=generateBool(false, TOGGLE_QR)
const showRaw=generateBoolSet(false, SET_SHOW_RAW)
const showRawMacaroon=generateBoolSet(false, SET_SHOW_RAW_MACAROON)


export default combineReducers({
    open,
    showRaw,
    showRawMacaroon
})