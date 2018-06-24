import signin, {encryptedMacaroonReducer, passwordReducer} from './signInReducer'
import connection from './connectReducer'
import drawer from './homeReducer'
import network from './networkInformation'
import invoice, {paymentRequest} from './invoiceReducer'
import qr from './qrReducer'
import payment from './paymentReducer'
import {combineReducers} from 'redux'

export default combineReducers({
    signin,
    connection,
    drawer,
    network,
    encryptedMacaroon:encryptedMacaroonReducer,
    passwordError:passwordReducer,
    invoice,
    payment,
    paymentRequest,
    qr
})