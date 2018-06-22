import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetch from 'jest-fetch-mock'
Enzyme.configure({ adapter: new Adapter() })
global.fetch = fetch

let localStorageData={}
const localStorageMock = {
    getItem: key=>localStorageData[key],
    setItem: (key, value)=>{
        localStorageData[key]=value
    },
    clear: ()=>{
        localStorageData={}
    },
    removeItem:key=>{
        localStorageData[key]=null
    }
}
global.localStorage = localStorageMock