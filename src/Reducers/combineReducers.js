import signin from './SignInReducer'
import connection from './ConnectReducer'
import {combineReducers} from 'redux'

export default combineReducers({
    signin,
    connection
})