import {ConnectionAlert} from 'views/ConnectionAlert'
import React from 'react'
import { shallow, mount } from 'enzyme'
import {
    CONNECTION_BUT_LOCKED, 
    CONNECTION_UNLOCKED, 
    NO_CONNECTION
} from 'Reducers/connectReducer'

describe('render', ()=>{
    it('renders without error with justUpdated=false', ()=>{
        mount(<ConnectionAlert justUpdated={false} message='hello'/>)
    })
    it('renders without error with justUpdated=true', ()=>{
        mount(<ConnectionAlert justUpdated={true} message='hello'/>)
    })
    it('renders without error with justUpdated=true and a correct message', ()=>{
        mount(<ConnectionAlert justUpdated={true} message={CONNECTION_BUT_LOCKED}/>)
    })
})

describe('functionality', ()=>{
    it('has correct message when success', ()=>{
        const connectionAlert=mount(<ConnectionAlert justUpdated={true} message={CONNECTION_UNLOCKED}/>)
        console.log(connectionAlert.find('span').text())
        expect(connectionAlert.find('span').text()).toEqual('Successful connection!')
    })
})