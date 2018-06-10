import signin from './SignInReducer'
import connection from './ConnectReducer'
import {combineReducers} from 'react-redux'

export default combineReducers({
    signin,
    connection
})