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

export const delay=ms=>new Promise((resolve, _)=>{
    setTimeout(()=>resolve(), ms)
})

export const eventOrValue=eOrV=>{
    if(eOrV===null||eOrV===undefined){
        return eOrV
    }
    if(eOrV.target){
        return eOrV.target.value
    }
    else{
        return eOrV
    }
}