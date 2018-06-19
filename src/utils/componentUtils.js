import {
    CONNECTION_BUT_LOCKED, 
    CONNECTION_UNLOCKED, 
    NO_CONNECTION
} from '../Reducers/connectReducer'

export const filterMessageVariant=message=>{
    switch(message){
        case CONNECTION_BUT_LOCKED:
            return 'warning' 
        case CONNECTION_UNLOCKED:
            return 'success' 
        case NO_CONNECTION:
            return 'danger'
        default:
            return 'info'
    }
}