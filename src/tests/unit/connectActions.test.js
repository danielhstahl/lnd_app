import {checkWhetherFound} from 'Actions/connectActions'
import {
    CONNECT_UNLOCKED,
    CONNECT_LOCKED,
    CONNECT_FAILED,
    MESSAGE_DANGER,
    MESSAGE_SUCCESS,
    MESSAGE_WARNING
} from 'Actions/actionDefinitions'
describe('checkWhetherFound', ()=>{
    
    it('correctly returns "{hello:world}" with dispatch of unlocked', done=>{
        const res={
            text:()=>' {"hello":"world"} '
        }
        const dispatch=jest.fn()
        const result=checkWhetherFound(dispatch)(res)
        result.then(jres=>{
            return expect(jres).toEqual({hello:'world'})
        }).then(()=>{
            expect(dispatch.mock.calls.length).toEqual(2)
            expect(dispatch.mock.calls[0][0]).toEqual({
                type:CONNECT_UNLOCKED
            })
            expect(dispatch.mock.calls[1][0]).toEqual({
                type:MESSAGE_SUCCESS,
                value:'Successful connection!'
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
        result.then(jres=>{
            return expect(jres).toEqual({hello:'world'})
        }).then(()=>{
            expect(dispatch.mock.calls.length).toEqual(3)
            expect(dispatch.mock.calls[0][0]).toEqual({
                type:CONNECT_UNLOCKED
            })
            expect(dispatch.mock.calls[1][0]).toEqual({
                type:MESSAGE_SUCCESS,
                value:'Successful connection!'
            })
            expect(dispatch.mock.calls[2][0]).toEqual({
                type:'SOME_TYPE',
                value:{hello:"world"}
            })
            done()
        }).catch(err=>{

            console.log(err)
            done.fail(err)
        })
        
    })
    it('correctly returns "locked" with dispatch of lock', done=>{
        const res={
            text:()=>' Not Found '
        }
        const dispatch=jest.fn()
        const result=checkWhetherFound(dispatch, 'SOME_TYPE')(res)
        result.then(txt=>{
            return expect(txt).toEqual({status:'locked'})
        }).then(()=>{
            expect(dispatch.mock.calls.length).toEqual(2)
            expect(dispatch.mock.calls[0][0]).toEqual({
                type:CONNECT_LOCKED
            }) 
            expect(dispatch.mock.calls[1][0]).toEqual({
                type:MESSAGE_WARNING,
                value:'Connection succeeded, but wallet is locked'
            })
            done()
        }).catch(err=>{

            console.log(err)
            done.fail(err)
        })
        
    })
    
})