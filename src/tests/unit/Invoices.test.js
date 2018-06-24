import {PendingInvoices} from 'views/Invoices'
import React from 'react'
import { shallow, mount } from 'enzyme'
import {CONNECT_UNLOCKED} from 'Actions/actionDefinitions'
import {MemoryRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import reducer from 'Reducers/reducers'
import { createStore } from 'redux'
const store = createStore(reducer)
const showQR=payment_request=>()=>payment_request
describe('render', ()=>{
    const getInvoices=val=>val=>val
    const classes={
        cardTitleWhite:'hello',
        cardCategoryWhite:'hello'
    }
    const data={invoices:[
        {
            memo:'hello',
            payment_request:'hello',
            value:'500',
            creation_date:10000000,
        }
    ]}
    it('renders without error with no connection', ()=>{
        
        mount(<Provider store={store}><MemoryRouter><PendingInvoices 
            getInvoices={getInvoices}
            invoices={data}
            encryptedMacaroon='s'
            password='s'
            classes={classes}
            showQR={showQR}
            paymentRequest=''
            /></MemoryRouter></Provider>
        )
    })
    it('renders without error with connection and no paymentRequest', ()=>{
        store.dispatch({
            type:CONNECT_UNLOCKED
        })
        mount(<Provider store={store}><MemoryRouter><PendingInvoices 
            getInvoices={getInvoices}
            invoices={data}
            encryptedMacaroon='s'
            password='s'
            classes={classes}
            showQR={showQR}
            paymentRequest=''
            /></MemoryRouter></Provider>
        )
    })
    it('renders without error with connection and paymentRequest', ()=>{
        store.dispatch({
            type:CONNECT_UNLOCKED
        })
        mount(<Provider store={store}><MemoryRouter><PendingInvoices 
            getInvoices={getInvoices}
            invoices={data}
            encryptedMacaroon='s'
            password='s'
            showQR={showQR}
            classes={classes}
            paymentRequest='hello'
            /></MemoryRouter></Provider>
        )
    })

})
