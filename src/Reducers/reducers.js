import signin, {encryptedMacaroonReducer, passwordReducer} from './signInReducer'
import connection from './connectReducer'
import drawer from './homeReducer'
import network from './networkInformation'
import {combineReducers} from 'redux'

export default combineReducers({
    signin,
    connection,
    drawer,
    network,
    encryptedMacaroon:encryptedMacaroonReducer,
    passwordError:passwordReducer
})