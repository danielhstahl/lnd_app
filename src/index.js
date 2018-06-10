import React from 'react'
import './index.css'
import App from './App'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Reducers/combineReducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducer)

render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'))
registerServiceWorker()
