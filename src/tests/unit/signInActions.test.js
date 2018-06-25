import {setMacaroon, setHostname} from 'Actions/signInActions'
import crypto from 'crypto'
if (!global.window.localStorage) {
    global.window.localStorage = {
      getItem() { return '{}'; },
      setItem() {}
    };
}
describe('setMacaroon', ()=>{
    it('dispatches encrypted macaroon if macaroon exists', done=>{
        const password='hello'
        const macaroon='world'
        const dispatch=({value})=>{
            const decipher = crypto.createDecipher('aes192', password)
            const decrypted=decipher.update(value, 'hex', 'utf8')+ decipher.final('utf8')
            expect(decrypted).toEqual(macaroon)
            done()
        }
        setMacaroon(dispatch)({macaroon, password})()
    })
    it('returns undefined if macaroon does not exist', done=>{
        const password='hello'
        const macaroon=''
        const dispatch=({value})=>{
            done.fail()
        }
        expect(setMacaroon(dispatch)({macaroon, password})()).toEqual(undefined)
        done()
    })
})
describe('setHostname', ()=>{
    it('dispatches hostname if exists', done=>{
        const hostname='world'
        const dispatch=({value})=>{
            expect(hostname).toEqual(hostname)
            done()
        }
        setHostname(dispatch)({hostname})()
    })
    it('returns undefined if hostname does not exist', done=>{
        const hostname=''
        const dispatch=({value})=>{
            done.fail()
        }
        expect(setHostname(dispatch)({hostname})()).toEqual(undefined)
        done()
    })
})
