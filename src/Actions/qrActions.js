import { TOGGLE_SHOW_RAW, TOGGLE_QR } from "./actionDefinitions";

export const toggleQRRaw=dispatch=>()=>dispatch({
   type:TOGGLE_SHOW_RAW 
})
export const toggleQRShow=dispatch=>()=>dispatch({
    type:TOGGLE_QR
})