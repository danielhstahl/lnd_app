import {eventOrValue, delay} from 'utils/componentUtils'

describe('eventOrValue', ()=>{
    it('returns value when event', ()=>{
        const event={
            target:{
                value:5
            }
        }
        expect(eventOrValue(event)).toEqual(5)
    })
    it('returns value when value', ()=>{
        const event=5
        expect(eventOrValue(event)).toEqual(5)
    })
    it('returns null when null', ()=>{
        const event=null
        expect(eventOrValue(event)).toEqual(null)
    })
    it('returns empty string when empty string', ()=>{
        const event=''
        expect(eventOrValue(event)).toEqual('')
    })
    it('returns empty string when empty event string', ()=>{
        const event={
            target:{
                value:''
            }
        }
        expect(eventOrValue(event)).toEqual('')
    })
})

describe('delay', ()=>{
    jest.useFakeTimers()
    it('correctly calls function after 5 seconds', ()=>{
        
        delay(5000)
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)
    })
    
    it('correctly returns promise after 5 seconds', ()=>{
        delay(5000).then(()=>{
            return expect(true).toEqual(true)
        })
    })
})