const express=require('express')
const path=require('path')
const app=express()
const https=require('https')
const hostname=process.env.HOST_NAME
const port=process.env.HOST_PORT
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname)))
const sendItemToServer=(req, res)=>{
    const headerKey='grpc-metadata-macaroon'
    const getHeader=req.headers[headerKey]
    const options={
        path:req.path,
        hostname,
        port,
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
            res.send(result)
        })
    })
    serverRequest.on('error', err=>{
        console.log(err)
    })
    serverRequest.end()
    

}
app.all('/v1/*', sendItemToServer)

app.set('port', (5000))

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})
