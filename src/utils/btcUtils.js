import convert from './bitcoinConvert'
export const convertNixTimestamp=timestamp=>parseInt(timestamp, 10)*1000
const locale='en-US'
export const convertDateToString=date=>{
    const dt=new Date(date)
    return `${dt.toLocaleDateString(locale)} ${dt.toLocaleTimeString(locale)}`
}

export const convertSatoshiToBTC=numSatoshi=>numSatoshi?convert(numSatoshi, 'Satoshi', 'BTC', 'String'):''
export const convertBTCToSatoshi=numBTC=>numBTC?convert(numBTC, 'BTC', 'Satoshi', 'String'):''