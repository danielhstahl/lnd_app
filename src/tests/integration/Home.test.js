import React from 'react'
import 'index.css'
import Home from 'views/Home'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { createStore } from 'redux'
import reducer from 'Reducers/reducers'
import 'typeface-roboto'
import registerServiceWorker from 'registerServiceWorker'
import 'assets/css/material-dashboard-react.css'
import SignIn from 'views/SignIn'
import {
    MemoryRouter as Router,
    Route
} from 'react-router-dom'
const store = createStore(reducer)

describe('render', ()=>{
    it('renders without error', ()=>{
        mount(
            <Provider store={store}>
                <Router>
                    <Route path='/' component={Home}/>
                </Router>
            </Provider>
        )
    })
})
describe('integrations', ()=>{
    it('correctly renders settings on start', ()=>{
        const app=mount(
            <Provider store={store}>
                <Router>
                    <Route path='/' component={Home}/>
                </Router>
            </Provider>
        )
        expect(app.find(SignIn).length).toEqual(1)
    })
})