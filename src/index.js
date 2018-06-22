import React from 'react'
import './index.css'
import App from './App'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Reducers/combineReducers'
import registerServiceWorker from './registerServiceWorker'
import {
    HashRouter as Router,
  } from 'react-router-dom'
const store = createStore(reducer)

render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
document.getElementById('root'))
registerServiceWorker()
