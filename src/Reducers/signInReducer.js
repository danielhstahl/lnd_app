import { 
    ENTER_SIGN_IN 
} from '../Actions/actionDefinitions'

export default (state={}, action)=>{
    switch(action.type){
        case ENTER_SIGN_IN:
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}