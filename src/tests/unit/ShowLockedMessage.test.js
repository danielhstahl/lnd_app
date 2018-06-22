import {ShowLockedMessage} from 'components/Utils/ShowLockedMessage'
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import reducer from 'Reducers/reducers'
import {MemoryRouter} from 'react-router-dom'
import { createStore } from 'redux'
import StandardLightningError from 'components/Utils/StandardLightningError'
const store = createStore(reducer)
import {
    CONNECTION_UNLOCKED, 
} from 'Reducers/connectReducer'

describe('render', ()=>{
    it('renders without error when connection unlocked', ()=>{
        mount(
            <Provider store={store}>
                <MemoryRouter>
                    <ShowLockedMessage connectionStatus={CONNECTION_UNLOCKED}>
                        hello
                    </ShowLockedMessage>
                </MemoryRouter>
            </Provider>
        )
    })
    it('renders without error when connection locked', ()=>{
        mount(
            <Provider store={store}>
                <MemoryRouter>
                    <ShowLockedMessage connectionStatus='something'>
                        hello
                    </ShowLockedMessage>
                </MemoryRouter>
            </Provider>
        )
    })
})

describe('functionality', ()=>{
    it('has correct message when connection unlocked', ()=>{
        const lockedMessage=mount(
            <Provider store={store}>
                <MemoryRouter>
                    <ShowLockedMessage connectionStatus={CONNECTION_UNLOCKED}>
                        <span>hello</span>
                    </ShowLockedMessage>
                </MemoryRouter>
            </Provider>
        )
        expect(lockedMessage.find('span').text()).toEqual('hello')
    })
    it('has correct message when connection unlocked', ()=>{
        const lockedMessage=mount(
            <Provider store={store}>
                <MemoryRouter>
                    <ShowLockedMessage connectionStatus='something'>
                        <span>hello</span>
                    </ShowLockedMessage>
                </MemoryRouter>
            </Provider>
        )
        expect(lockedMessage.find(StandardLightningError).length).toEqual(1)
    })
})