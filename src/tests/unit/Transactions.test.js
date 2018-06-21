import {Transactions} from 'views/Transactions'
import React from 'react'
import { shallow, mount } from 'enzyme'
import {CONNECTION_UNLOCKED} from '../Reducers/connectReducer'

describe('render', ()=>{
    const getTransactions=val=>val
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
        mount(<Transactions 
            getTransactions={getTransactions}
            connectionStatus={'something'}
            transactions={data}
            encryptedMacaroon='s'
            password='s'
            classes={classes}
            />
        )
    })
    it('renders without error with connection', ()=>{
        mount(<Transactions 
            getTransactions={getTransactions}
            connectionStatus={CONNECTION_UNLOCKED}
            transactions={data}
            encryptedMacaroon='s'
            password='s'
            classes={classes}
            />
        )
    })

})
