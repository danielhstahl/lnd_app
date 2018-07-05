import {ConnectionAlert} from 'views/ConnectionAlert'
import React from 'react'
import { shallow, mount } from 'enzyme'
import {
    CONNECTION_BUT_LOCKED, 
    CONNECTION_UNLOCKED, 
    NO_CONNECTION
} from 'Reducers/connectReducer'

describe('render', ()=>{
    const messageStatus={
        status:'success',
        message:'hello'
    }
    it('renders without error with justUpdated=false', ()=>{
        mount(<ConnectionAlert justUpdated={false} messageStatus={messageStatus}/>)
    })
    it('renders without error with justUpdated=true', ()=>{
        mount(<ConnectionAlert justUpdated={true} messageStatus={messageStatus}/>)
    })
    it('renders without error with justUpdated=true and a correct message', ()=>{
        mount(<ConnectionAlert justUpdated={true} messageStatus={messageStatus}/>)
    })
})

describe('functionality', ()=>{
    const messageStatus={
        status:'success',
        message:'hello'
    }
    it('has correct message when success', ()=>{
        const connectionAlert=mount(<ConnectionAlert justUpdated={true} messageStatus={messageStatus}/>)
        console.log(connectionAlert.find('span').text())
        expect(connectionAlert.find('span').text()).toEqual('hello')
    })
})