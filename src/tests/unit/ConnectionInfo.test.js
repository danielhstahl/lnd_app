import {ChainStats} from 'views/ConnectionInfo'
import React from 'react'
import {  mount } from 'enzyme'

import {
    CONNECT_UNLOCKED,
    CONNECT_NO_ATTEMPT
} from 'Actions/actionDefinitions'

describe('render', ()=>{
    const info={
        synced_to_chain:true,
        num_peers:5,
        testnet:true,
        block_height:300
    }
    const classes={
        logoImage:"some image",
        infoIcon:"some icon",
        img:"some class"
    }
    it('renders without error', ()=>{
        mount(<ChainStats 
            info={info} 
            classes={classes}
            connectStatus='Wallet is locked'
        />)
    })
    it('renders without error  a correct message', ()=>{
        mount(<ChainStats 
            info={info}  
            classes={classes} 
            connectStatus={CONNECT_NO_ATTEMPT}
        />)
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
        logoImage:"some image",
        infoIcon:"some icon",
        img:"some class"
    }
    it('has correct message when success', ()=>{
        const chainStats=mount(<ChainStats info={info}  classes={classes} connectStatus={CONNECT_UNLOCKED}/>)
        expect(chainStats.find('span').text()).toEqual('Peers: 5Network: TestNetBlock Height: 300')
    })
    it('shows disconnected if not attempted to connect', ()=>{
        const chainStats=mount(<ChainStats info={info}  classes={classes} connectStatus={CONNECT_NO_ATTEMPT}/>)
        expect(chainStats.html().startsWith('<div>Status: Disconnected')).toEqual(true)
    })
})