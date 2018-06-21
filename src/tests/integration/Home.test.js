import {Home} from 'views/Home'
import React from 'react'
import { shallow, mount } from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
describe('render', ()=>{
    const classes={
        mainPanel:{},
        content:{},
        container:{}
    }
    const location={
        pathname:'hello'
    }
    it('renders without error when drawer toggled on', ()=>{
        mount(
        <MemoryRouter>
            <Home toggleDrawer={()=>{}} drawer={true} classes={classes} location={location} />
        </MemoryRouter>
        )
    })
    it('renders without error when drawer toggled off', ()=>{
        mount(
        <MemoryRouter>
            <Home toggleDrawer={()=>{}} drawer={false} classes={classes} location={location}/>
        </MemoryRouter>
        )
    })
})