const express=require('express')
const fs=require('fs')
const cors = require('cors')
//const path=require('path')
const app=express()
const https=require('https')

const corsOptions = {
    origin: 'https://phillyfan1138.github.io/lnd_app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

const key = fs.readFileSync('/etc/letsencrypt/live/lightningnetwork.chickenkiller.com/privkey.pem')
var cert = fs.readFileSync( '/etc/letsencrypt/live/lightningnetwork.chickenkiller.com/fullchain.pem')

const options={
    key,
    cert
}
const local_port=process.env.LOCAL_PORT||8081
const lightning_host=process.env.HOST_NAME||'localhost'
const lightning_port=process.env.HOST_PORT||8080
https.createServer(options, app).listen(local_port)
const bodyParser = require('body-parser')
app.use(bodyParser.json())
//app.use(express.static(path.join(__dirname)))
const sendItemToServer=(req, res)=>{
    const headerKey='grpc-metadata-macaroon'
    const getHeader=req.headers[headerKey]
    const options={
        path:req.path,
        hostname:lightning_host,
        port:lightning_port,
        headers:{[headerKey]:getHeader},
        body:req.body,
        method:req.method,
        rejectUnauthorized: false,
    }
    let result=''
    const serverRequest=https.request(options, serverResult=>{
        serverResult.on('data', d => {
            result+=d
        })
        serverResult.on('end', ()=>{
            console.log(result)
            res.send(result)
        })
    })
    serverRequest.on('error', err=>{
        console.log(err)
    })
    serverRequest.end()
}
app.all('/v1/*', sendItemToServer)

//app.set('port', port)
/*
app.listen(app.get('port'), () => {
    //console.log('Node app is running on port', port)
    console.log('Proxying to', lightning_host, ':', lightning_port)
})*/
