import {setMacaroon} from 'Actions/signInActions'
import crypto from 'crypto'
if (!global.window.localStorage) {
    global.window.localStorage = {
      getItem() { return '{}'; },
      setItem() {}
    };
  }
describe('setMacaroon', ()=>{
    it('dispatches encrypted macaroon if macaroon exists', ()=>{
        const password='hello'
        const macaroon='world'
        const dispatch=({value})=>{
            const decipher = crypto.createDecipher('aes192', password)
            const decrypted=decipher.update(value, 'hex', 'utf8')+ decipher.final('utf8')
            expect(decrypted).toEqual(macaroon)
        }
        setMacaroon(dispatch)({macaroon, password})()
    })
    it('returns undefined if macaroon does not exist', ()=>{
        const password='hello'
        const macaroon=''
        const dispatch=({value})=>{
            
        }
        expect(setMacaroon(dispatch)({macaroon, password})()).toEqual(undefined)
        
    })
})
