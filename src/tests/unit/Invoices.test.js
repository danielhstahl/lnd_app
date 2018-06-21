import {Invoices} from 'views/Invoices'
import React from 'react'
import { shallow, mount } from 'enzyme'
import {CONNECTION_UNLOCKED} from '../Reducers/connectReducer'

describe('render', ()=>{
    const getInvoices=val=>val
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
        mount(<Invoices 
            getInvoices={getInvoices}
            connectionStatus={'something'}
            invoices={data}
            encryptedMacaroon='s'
            password='s'
            classes={classes}
            />
        )
    })
    it('renders without error with connection', ()=>{
        mount(<Invoices 
            getInvoices={getInvoices}
            connectionStatus={CONNECTION_UNLOCKED}
            invoices={data}
            encryptedMacaroon='s'
            password='s'
            classes={classes}
            />
        )
    })

})
