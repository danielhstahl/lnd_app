import React from 'react'
import './index.css'
//import App from './App'
import Home from './views/Home'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Reducers/reducers'
import 'typeface-roboto'
import registerServiceWorker from './registerServiceWorker'
import "assets/css/material-dashboard-react.css?v=1.3.0"
import {
    HashRouter as Router,
    Route
} from 'react-router-dom'
const store = createStore(reducer)

render(
    <Provider store={store}>
        <Router>
            <Route path='/' component={Home}/>
        </Router>
    </Provider>, 
document.getElementById('root'))
registerServiceWorker()
