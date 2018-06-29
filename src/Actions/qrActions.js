import { SET_SHOW_RAW, TOGGLE_QR, SET_SHOW_RAW_MACAROON } from "./actionDefinitions";

export const setQRRaw=dispatch=>prevVal=>()=>dispatch({
   type:SET_SHOW_RAW,
   value:!prevVal
})
export const setQRRawMacaroon=dispatch=>prevVal=>()=>dispatch({
   type:SET_SHOW_RAW_MACAROON,
   value:!prevVal
})
export const toggleQRShow=dispatch=>()=>dispatch({
    type:TOGGLE_QR
})