import { TOGGLE_QR, TOGGLE_SHOW_RAW } from "../Actions/actionDefinitions"
import {combineReducers} from 'redux'

const generateBool=(defaultState, type)=>(state=defaultState, action)=>{
    switch(action.type){
        case type:
            return !state
        default:
            return state
    }
}

const open=generateBool(false, TOGGLE_QR)
const showRaw=generateBool(false, TOGGLE_SHOW_RAW)


export default combineReducers({
    open,
    showRaw
})