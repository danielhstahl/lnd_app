import {checkWhetherFound} from 'Actions/connectActions'
import {
    CONNECT_UNLOCKED,
    CONNECT_LOCKED,
    CONNECT_FAILED
} from 'Actions/actionDefinitions'
describe('checkWhetherFound', ()=>{
    
    it('correctly returns "hello" with dispatch of unlocked', done=>{
        const res={
            text:()=>' hello '
        }
        const dispatch=jest.fn()
        const result=checkWhetherFound(dispatch)(res)
        result.then(txt=>{
            return expect(txt).toEqual('hello')
        }).then(()=>{
            expect(dispatch.mock.calls.length).toEqual(1)
            expect(dispatch.mock.calls[0][0]).toEqual({
                type:CONNECT_UNLOCKED
            })
            done()
        }).catch(err=>{
            console.log(err)
            done.fail(err)
        })
        
    })
    it('correctly returns "{hello:world}" with dispatch of data', done=>{
        const res={
            text:()=>' {"hello":"world"} '
        }
        const dispatch=jest.fn()
        const result=checkWhetherFound(dispatch, 'SOME_TYPE')(res)
        result.then(txt=>{
            return expect(txt).toEqual('{"hello":"world"}')
        }).then(()=>{
            expect(dispatch.mock.calls.length).toEqual(2)
            expect(dispatch.mock.calls[0][0]).toEqual({
                type:CONNECT_UNLOCKED
            })
            expect(dispatch.mock.calls[1][0]).toEqual({
                type:'SOME_TYPE',
                value:{hello:"world"}
            })
            done()
        }).catch(err=>{

            console.log(err)
            done.fail(err)
        })
        
    })
    it('correctly returns "Not Found" with dispatch of lock', done=>{
        const res={
            text:()=>' Not Found '
        }
        const dispatch=jest.fn()
        const result=checkWhetherFound(dispatch, 'SOME_TYPE')(res)
        result.then(txt=>{
            return expect(txt).toEqual('Not Found')
        }).then(()=>{
            expect(dispatch.mock.calls.length).toEqual(1)
            expect(dispatch.mock.calls[0][0]).toEqual({
                type:CONNECT_LOCKED
            })
            done()
        }).catch(err=>{

            console.log(err)
            done.fail(err)
        })
        
    })
    it('correctly errors if dispatching non-json', done=>{
        const res={
            text:()=>' hello '
        }
        const dispatch=jest.fn()
        const result=checkWhetherFound(dispatch, 'SOME_TYPE')(res)
        result.then(txt=>{
            return expect(txt).toEqual(undefined)
        }).then(()=>{
            expect(dispatch.mock.calls.length).toEqual(2)
            expect(dispatch.mock.calls[0][0]).toEqual({
                type:CONNECT_UNLOCKED
            })
            expect(dispatch.mock.calls[1][0]).toEqual({
                type:CONNECT_FAILED
            })
            done()
        }).catch(err=>{

            console.log(err)
            done.fail(err)
        })
        
    })
})