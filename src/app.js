const startupDebugger = require('debug')('app:startup') // <-- namespaced
const config = require('config')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')

const app = express()

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    startupDebugger("Morgan enabled...")
}

app.use(express.json())
app.use(express.static('public'))

// Database Connection
mongoose.connect('mongodb://localhost/bluestar')
    .then(() => startupDebugger("Connected to bluestar database..."))
    .catch(error => startupDebugger("Error connecting to bluestar database."))

// Routes
const users = require('../routes/users')
const shops = require('../routes/shops')
const quizzes = require('../routes/quizzes')
app.use('/api/users', users)
app.use('/api/shops', shops)
app.use('/api/quizzes', quizzes)

// PORT environment variable
const port = process.env.PORT || 8081
app.listen(port, () => console.log(`Listening on port ${port}...`))
