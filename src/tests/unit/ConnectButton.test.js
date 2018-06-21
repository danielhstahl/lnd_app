import {LndButton} from 'views/ConnectButton'
import React from 'react'
import { shallow, mount } from 'enzyme'

describe('render', ()=>{
    it('renders without error when connecting', ()=>{
        mount(<LndButton handleConnect={()=>{}} isConnecting={false}>hello</LndButton>)
    })
    it('renders without error when not connecting', ()=>{
        mount(<LndButton handleConnect={()=>{}} isConnecting={true}>hello</LndButton>)
    })
})