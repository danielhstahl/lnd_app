import {Transactions} from 'views/Transactions'
import React from 'react'
import { shallow, mount } from 'enzyme'
import {CONNECTION_UNLOCKED} from 'Reducers/connectReducer'
import {MemoryRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import reducer from 'Reducers/reducers'
import { createStore } from 'redux'
const store = createStore(reducer)
describe('render', ()=>{
    const getTransactions=val=>val=>val
    const classes={
        cardTitleWhite:'hello',
        cardCategoryWhite:'hello'
    }
    const data=[
        {
            tx_hash:'hello',
            amount:'hello',
            num_confirmations:'hello',
            time_stamp:'hello',
            total_fees:'hello'
        }
    ]
    it('renders without error with no connection', ()=>{
        mount(<Provider store={store}><MemoryRouter><Transactions 
            getTransactions={getTransactions}
            connectionStatus={'something'}
            transactions={data}
            encryptedMacaroon='s'
            password='s'
            classes={classes}
            /></MemoryRouter></Provider>
        )
    })
    it('renders without error with connection', ()=>{
        mount(<Provider store={store}><MemoryRouter><Transactions 
            getTransactions={getTransactions}
            connectionStatus={CONNECTION_UNLOCKED}
            transactions={data}
            encryptedMacaroon='s'
            password='s'
            classes={classes}
            /></MemoryRouter></Provider>
        )
    })

})
