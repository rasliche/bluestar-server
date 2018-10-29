require('express-async-errors')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
// const logger = require('./utilities/logger')

const app = express()
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))

require('./startup/db')()
require('./startup/routes')(app)

// app.use(express.static('public')) // static files

// PORT environment variable
const port = process.env.PORT || 8081
app.listen(port, () => console.log(`Listening on port ${port}...`))
