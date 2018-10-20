require('express-async-errors')
const config = require('config')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const logger = require('./utilities/logger')

// Configuration
if (!config.get("jwtPrivateKey")) {
    logger.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}

const app = express()
require('./startup/db')()
require('./startup/routes')(app)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    logger.info("Morgan enabled...")
}

// throw new Error("Hey Winston!")
app.use(cors())
app.use(express.static('public'))

// PORT environment variable
const port = process.env.PORT || 8081
app.listen(port, () => logger.info(`Listening on port ${port}...`))
