const express=require('express')
//const expressStaticGzip = require("express-static-gzip")
const path=require('path')
const app=express()
const https=require('https')
const lightning_host=process.env.HOST_NAME||'localhost'
const lightning_port=process.env.HOST_PORT||8080
const port=process.env.PORT||8081
const bodyParser = require('body-parser')
app.use(bodyParser.json())
//app.use('/', expressStaticGzip(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname)))
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

app.set('port', port)

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', port)
    console.log('Proxying to', lightning_host, ':', lightning_port)
})
