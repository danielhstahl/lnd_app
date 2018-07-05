const express=require('express')
const fs=require('fs')
const cors = require('cors')
const app=express()
const https=require('https')
const request=require('request')
const local_port=process.env.LOCAL_PORT||8081
const lightning_host=process.env.HOST_NAME||'localhost'
const lightning_port=process.env.HOST_PORT||8080
const path_to_keys=process.env.FILE_CERT


const corsOptions = {//
    origin: 'https://phillyfan1138.github.io/lnd_app'
}
app.use(cors(/*corsOptions*/))

const key = fs.readFileSync(`${path_to_keys}/privkey.pem`)
var cert = fs.readFileSync( `${path_to_keys}/fullchain.pem`)

const options={key, cert}

https.createServer(options, app).listen(local_port)
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const sendItemToServer=(req, res)=>{
    const headerKey='grpc-metadata-macaroon'
    const header=req.headers[headerKey]
    const options={
        url:`https://${lightning_host}:${lightning_port}${req.path}`,
        method:req.method,
        headers:{[headerKey]:header},
        body:JSON.stringify(req.body),
        rejectUnauthorized: false,
    }
    request(options, (error, response, body) =>{
        if(error){
            console.log(error)
            res.send(error)
        }
        else{
            //console.log(body)
            res.send(body)
        }
    })
}
app.all('/v1/*', sendItemToServer)

