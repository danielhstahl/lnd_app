import {QRInput} from 'components/Utils/QRInput'
import React from 'react'
import { shallow, mount } from 'enzyme'
/*import * as moduleToMock from 'react-qr-reader'
moduleToMock=props=><div></div>
jest.setMock('QrReader', moduleToMock)*/
jest.mock('react-qr-reader', ()=>()=><div></div>)

describe('render', ()=>{
    it('renders without error with showRaw false', ()=>{
        mount(
            <QRInput 
                labelText='hello' 
                showRaw={false} 
                value='hello'
                onChange={()=>{}}
            />
        )
    })
    it('renders without error with showRaw true ', ()=>{
        mount(
            <QRInput 
                labelText='hello' 
                showRaw={true} 
                value='hello'
                onChange={()=>{}}
            />
        )
    })
    
    it('renders without error with showRaw false and empty string', ()=>{
        mount(
            <QRInput 
                labelText='hello' 
                showRaw={false} 
                value=''
                onChange={()=>{}}
            />
        )
    })


})
