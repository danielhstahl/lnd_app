import {QRView} from 'components/Utils/QRView'
import React from 'react'
import { shallow, mount } from 'enzyme'

describe('render', ()=>{
    it('renders without error with showRaw and open false', ()=>{
        mount(
            <QRView 
                qrRaw='hello' 
                showRaw={false} 
                toggleRaw={()=>{}}
                handleClose={()=>{}}
                open={false}
            />
        )
    })
    it('renders without error with showRaw true and open false', ()=>{
        mount(
            <QRView 
                qrRaw='hello' 
                showRaw={true} 
                toggleRaw={()=>{}}
                handleClose={()=>{}}
                open={false}
            />
        )
    })
    it('renders without error with showRaw false and open true', ()=>{
        mount(
            <QRView 
                qrRaw='hello' 
                showRaw={false} 
                toggleRaw={()=>{}}
                handleClose={()=>{}}
                open={true}
            />
        )
    })
    it('renders without error with showRaw and open true', ()=>{
        mount(
            <QRView 
                qrRaw='hello' 
                showRaw={true} 
                toggleRaw={()=>{}}
                handleClose={()=>{}}
                open={true}
            />
        )
    })
    it('renders without error with showRaw false and empty string', ()=>{
        mount(
            <QRView 
                qrRaw='' 
                showRaw={false} 
                toggleRaw={()=>{}}
                handleClose={()=>{}}
                open={true}
            />
        )
    })


})
