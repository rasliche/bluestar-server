const config = require('config')
require('express-async-errors')
const helmet = require('helmet')
const express = require('express')
const app = express()
app.use(helmet())

// Configuration
console.log('Application Name: ' + config.get('name'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

require('./startup/routes')(app)
require('./startup/db')()

const port = config.get('port')
const server = app.listen(port)
console.log(`Now listening on port ${port}.`)
    
module.exports = server