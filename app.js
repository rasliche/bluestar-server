const config = require('config')
require('express-async-errors')
const express = require('express')
const app = express()

require('./startup/config')(app)
require('./startup/routes')(app)
require('./startup/db')()

const port = config.get('port')
const server = app.listen(port)

if (config.util.getEnv('NODE_ENV') === 'development') {
    console.log(`Application Name: ${config.get('name')}`)
    console.log(`Now listening on port ${port}.`)
    console.log(`Running in '${config.util.getEnv('NODE_ENV')}' mode.`)
}

module.exports = server