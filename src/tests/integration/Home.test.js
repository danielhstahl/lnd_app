import React from 'react'
import 'index.css'
import { 
    SET_ENCRYPTED_MACAROON
} from 'Actions/actionDefinitions'
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
import StandardLightningError from 'components/utils/StandardLightningError'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import Button from 'components/CustomButtons/Button'
import {ConnectButton} from 'views/ConnectButton'
import {
    MemoryRouter as Router,
    Route
} from 'react-router-dom'
const store = createStore(reducer)
const textContent = node => {
    try {
      // enzyme sometimes blows up on text()
      return node.text();
    } catch (_e) {
      return '';
    }
}
beforeEach(() => {
    fetch.resetMocks()
})
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
    it('correctly provides warning when not connected and not in settings', ()=>{
        const app=mount(
            <Provider store={store}>
                <Router initialEntries={[ '/transactions' ]}>
                    <Route path='/' component={Home}/>
                </Router>
            </Provider>
        )
        app.update()
        expect(app.find('p').findWhere(v=>textContent(v)==='Not connected to the Lightning Network!  Go to settings to connect to update connection settings.').length).toEqual(1)
    })
    it('correctly requests macaroon and password if macaroon is not in localstorage', ()=>{
        
        const app=mount(
            <Provider store={store}>
                <Router>
                    <Route path='/' component={Home}/>
                </Router>
            </Provider>
        )
        
        app.update()
        const macaroons=app.findWhere(val=>textContent(val)==='Macaroon').find(InputLabel)
        expect(macaroons.length).toEqual(1)
        const password=app.findWhere(val=>textContent(val)==='Password').find(InputLabel)
        expect(password.length).toEqual(1)

    })
    it('correctly requests only password if macaroon is in localstorage', ()=>{
        const app=mount(
            <Provider store={store}>
                <Router>
                    <Route path='/' component={Home}/>
                </Router>
            </Provider>
        )
        store.dispatch({
            type:SET_ENCRYPTED_MACAROON,
            value:'something'
        })
        app.update()
        const macaroons=app.findWhere(val=>textContent(val)==='Macaroon').find(InputLabel)
        expect(macaroons.length).toEqual(0)
        const removeMacaroon=app.findWhere(val=>textContent(val)==='Remove existing encrypted macaroon').find(Button)
        expect(removeMacaroon.length).toEqual(1)
        const password=app.findWhere(val=>textContent(val)==='Password').find(InputLabel)
        expect(password.length).toEqual(1)

    })
    it('correctly removes existing and allows for typing new macaroon when macaroon starts in localstorage', ()=>{
        const app=mount(
            <Provider store={store}>
                <Router>
                    <Route path='/' component={Home}/>
                </Router>
            </Provider>
        )
        store.dispatch({
            type:SET_ENCRYPTED_MACAROON,
            value:'something'
        })
        app.update()

        const macaroons=app.findWhere(val=>textContent(val)==='Macaroon').find(InputLabel)
        expect(macaroons.length).toEqual(0)
        const removeMacaroon=app.findWhere(val=>textContent(val)==='Remove existing encrypted macaroon').find(Button)
        removeMacaroon.props().onClick()
        app.update()
        
        
        const macaroons2=app.findWhere(val=>textContent(val)==='Macaroon').find(InputLabel)
        expect(macaroons2.length).toEqual(1)
        const password=app.findWhere(val=>textContent(val)==='Password').find(InputLabel)
        expect(password.length).toEqual(1)

    })
    it('correctly shows errors when password and macaroon are entered but does not connect', ()=>{
        fetch.mockResponseOnce(' Not Found')
        const app=mount(
            <Provider store={store}>
                <Router>
                    <Route path='/' component={Home}/>
                </Router>
            </Provider>
        )
        app.update()       
        
        /**Simulate input to macaroon */
        const macaroonsInput=app.findWhere(val=>textContent(val)==='Macaroon').find(Input)
        expect(macaroonsInput.length).toEqual(1)
        macaroonsInput.props().onChange({target:{value:'hello'}})

        /**Simulate input to password */
        const passwordInput=app.findWhere(val=>textContent(val)==='Password').find(Input)
        expect(passwordInput.length).toEqual(1)
        passwordInput.props().onChange({target:{value:'password'}})

        /**Simulate click of button */
        const conButton=app.find(ConnectButton).find(Button)
        expect(conButton.text()).toEqual('Save and Connect')
        conButton.props().onClick()

        app.update()   

        

    })
})