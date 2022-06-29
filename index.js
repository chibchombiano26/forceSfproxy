const jsforce = require('jsforce');
const cors = require('cors')
const express = require('express')
const app = express()

const getConn = (token, instanceUrl) => {
    return new jsforce.Connection({
        instanceUrl: instanceUrl,
        accessToken: token
    })
}

app.use(cors())
app.use(express.json());

const port = process.env.PORT || 8000

app.post('/identity', async (req, res) => {
    try {
        const con = getConn(
            req.body.accessToken,
            req.body.instanceUrl
        );
        const response = await con.identity()
        res.send(JSON.stringify(response))
    }
    catch (err) {
        res.send(err)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})