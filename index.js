const cp = require('child_process')
const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const port = 3000



app.post('/', (req, res) => {
    let writeable = fs.createWriteStream('./test')
    req.pipe(writeable);
    req.on('end',() => {
        cp.exec('code test', (err, stdout) => {
            if(err) throw err;
            console.log(stdout)
        })
        res.end('File received\n')
    })
    
})

const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}
const server = https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log('server running at ' + port)
    })