
/*
const https=require('https')
const macaroon='0201036C6E6402BB01030A102D3601726151C09D0F1D4AE89EBDABB41201301A160A0761646472657373120472656164120577726974651A130A04696E666F120472656164120577726974651A170A08696E766F69636573120472656164120577726974651A160A076D657373616765120472656164120577726974651A170A086F6666636861696E120472656164120577726974651A160A076F6E636861696E120472656164120577726974651A140A05706565727312047265616412057772697465000006208D4779FBB9EF54A1606845FB1ED4DD0CE91BE32757C9903A70938437053DE100'

const options={
    hostname: '108.70.247.57',
    port: 8080,
    path: '/v1/getinfo',
    method: 'GET',
    rejectUnauthorized: false,
    headers:{
        "Grpc-Metadata-macaroon": macaroon
    }
}
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const req=https.request(options, res=>{
    res.on('data', (d) => {
        process.stdout.write(d)
    })
})
req.on('error', err=>{
    console.log(err)
})



req.end()*/


// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8080;
 
var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
})