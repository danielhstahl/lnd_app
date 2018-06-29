import { TOGGLE_SHOW_RAW, TOGGLE_QR, TOGGLE_SHOW_RAW_MACAROON } from "./actionDefinitions";

export const toggleQRRaw=dispatch=>()=>dispatch({
   type:TOGGLE_SHOW_RAW 
})
export const toggleQRRawMacaroon=dispatch=>()=>dispatch({
   type:TOGGLE_SHOW_RAW_MACAROON
})
export const toggleQRShow=dispatch=>()=>dispatch({
    type:TOGGLE_QR
})