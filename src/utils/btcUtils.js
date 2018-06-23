export const convertBTC=balance=>parseFloat(balance)/100000000
export const convertNixTimestamp=timestamp=>parseInt(timestamp, 10)*1000
const locale='en-US'
export const convertDateToString=date=>{
    const dt=new Date(date)
    return `${dt.toLocaleDateString(locale)} ${dt.toLocaleTimeString(locale)}`
}