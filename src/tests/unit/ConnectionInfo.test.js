import {ChainStats} from 'views/ConnectionInfo'
import React from 'react'
import { shallow, mount } from 'enzyme'
import {
    CONNECTION_BUT_LOCKED, 
    CONNECTION_UNLOCKED, 
    NO_ATTEMPT
} from 'Reducers/connectReducer'

describe('render', ()=>{
    const info={
        synced_to_chain:true,
        num_peers:5,
        testnet:true,
        block_height:300
    }
    const classes={
        logoImage:{},
        infoIcon:{},
        img:{}
    }
    it('renders without error', ()=>{
        mount(<ChainStats info={info} message='hello' classes={classes}/>)
    })
    it('renders without error  a correct message', ()=>{
        mount(<ChainStats info={info}  classes={classes} message={NO_ATTEMPT}/>)
    })
})

describe('functionality', ()=>{
    const info={
        synced_to_chain:true,
        num_peers:5,
        testnet:true,
        block_height:300
    }
    const classes={
        logoImage:{},
        infoIcon:{},
        img:{}
    }
    it('has correct message when success', ()=>{
        const chainStats=mount(<ChainStats info={info}  classes={classes} message={CONNECTION_UNLOCKED}/>)
        expect(chainStats.find('span').text()).toEqual('Peers: 5Network: TestNetBlock Height: 300')
    })
    it('shows disconnected if not attempted to connect', ()=>{
        const chainStats=mount(<ChainStats info={info}  classes={classes} message={NO_ATTEMPT}/>)
        expect(chainStats.html().startsWith('<div>Status: Disconnected')).toEqual(true)
    })
})