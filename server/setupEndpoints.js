module.exports.endpoints=(client, app)=>{
    /**Add subscriptions later */
   /* app.ws('/', function(ws, req) {
        ws.on('message', function(msg) {
            console.log(msg);
        });
        console.log('socket', req.testing);
        });*/
    app.get('/info', (_, res)=>{
        client.getInfo({}, (err, info) => {
            if(err){
                console.log(err)
                return res.send({err})
            }
            res.send(info)
        })
    })
    app.get('/channels', (_, res)=>{
        client.listChannels({}, function(err, channels) {
            if(err){
                return res.send({err})
            }
            res.send(channels)
        })
    })
    app.get('/balance', (_, res)=>{
        client.walletBalance({}, function(err, balance) {
            if(err){
                return res.send({err})
            }
            res.send(balance)
        })
    })
    app.post('/send_payment', (req, res)=>{
        const {payment_request}=req.body
        client.sendPaymentSync({payment_request}, function(err, result) {
            if(err){
                return res.send({err})
            }
            res.send(result)
        })
    })
    app.post('/decode_invoice', (req, res)=>{
        const {payment_request}=req.body
        client.decodePayReq({payment_request}, function(err, result) {
            if(err){
                return res.send({err})
            }
            res.send(result)
        })
    })
    app.post('/create_invoice', (req, res)=>{
        const {value}=req.body
        client.addInvoice({value}, function(err, result) {
            if(err){
                return res.send({err})
            }
            res.send(result)
        })
    })
    app.get('/list_payments', (_, res)=>{
        client.listPayments({}, function(err, payments) {
            if(err){
                return res.send({err})
            }
            res.send(payments)
        })
    })
    app.get('/list_invoices', (req, res)=>{
        const {pending_only}=req.params
        client.listInvoices({pending_only}, function(err, payments) {
            if(err){
                return res.send({err})
            }
            res.send(payments)
        })
    })
    app.post('/unlock_wallet', (req, res)=>{
        const {wallet_password}=req.body
        lightning.unlockWallet({wallet_password}, (err, _)=>{
            if(err){
                return res.send({err})
            }
            res.send({success:true})
        })
    })

}