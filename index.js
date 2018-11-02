require('express-async-errors')
const config = require('config')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
// const logger = require('./utilities/logger')

if (!config.get('jwtPrivateKey')) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined")
    process.exit(1)
}

const app = express()
app.use(cors())
app.use(morgan('tiny'))

require('./startup/db')()
require('./startup/routes')(app)
require('./startup/prod')(app)

// app.use(express.static('public')) // static files

// PORT environment variable
const port = process.env.PORT || 8081
app.listen(port, () => console.log(`Listening on port ${port}...`))
