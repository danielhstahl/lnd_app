const fs = require('fs-extra')
const child_process=require('child_process')
const {promisify}=require('util')
const grpc = require('grpc')
const {homedir}=require('os')
const path=require('path')
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'
const exec=promisify(child_process.exec)
const express = require('express')
const app = express()
const pathToLnd=process.env.NODE_ENV==='production'?path.resolve(homedir(), '.lnd'):path.basename(__dirname)
const pathOnNetwork=process.env.NODE_ENV==='production'?'localhost':process.env.IP
app.listen(3000, () => console.log('Example app listening on port 3000!'))
Promise.all([
    fs.realpath(path.resolve(pathToLnd, 'admin.macaroon'))
        .then(path=>fs.readFile(path))
        .then(m=>m.toString('hex'))
        .then(macaroon=>{
            const metadata=new grpc.Metadata()
            metadata.add('macaroon', macaroon)
            return grpc.credentials.createFromMetadataGenerator((_args, callback) =>{
                callback(null, metadata)
            })
        }),
    fs.realpath(path.resolve(pathToLnd, 'tls.cert'))
        .then(path=>fs.readFile(path))
        .then(grpc.credentials.createSsl),
    exec(`wget https://raw.githubusercontent.com/lightningnetwork/lnd/master/lnrpc/rpc.proto`)
        .then(_=>fs.readFile('./rpc.proto', 'utf8'))
        .then(d=>d.split('import "google/api/annotations.proto";').join(''))
        .then(d=>fs.writeFile('./rpc.proto', d))
]).then(([macaroonCreds, sslCreds, _])=>{
    return grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds)
}).then(credentials=>{

    const {lnrpc} = grpc.load('rpc.proto')
    const client = new lnrpc.Lightning(`${pathOnNetwork}:10009`, credentials)
    app.get('/info', (_, res) => {
        client.getInfo({}, (err, info) => {
            if(err){
                console.log(err)
                res.send(JSON.stringify({err}))
            }
            else{
                res.send(info)
            }
        })
    })

    return fs.remove('./rpc.proto')
}).catch(err=>{
    console.log(err)
    fs.remove('./rpc.proto')
})

