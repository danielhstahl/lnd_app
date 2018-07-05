export const MUI_SUCCESS='success'
export const MUI_WARNING='warning'
export const MUI_DANGER='danger'
export const MUI_INFO='info'

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