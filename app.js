const config = require('config')
const express = require('express')
require('express-async-errors')
const helmet = require('helmet')
const mongoose = require('mongoose')

const usersRoutes = require('./routes/users')
const quizzesRoutes = require('./routes/quizzes')
const operatorsRoutes = require('./routes/operators')
const lessonsRoutes = require('./routes/lessons')
const postsRoutes = require('./routes/posts')
const programsRoutes = require('./routes/programs')
const authRoutes = require('./routes/auth')

const app = express()
app.use(helmet())
app.use(express.json())

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

app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({ message: message })
})

mongoose.connect(config.get('mongo_db_uri'))
    .then(result => {
        app.listen(config.get('port'))
    })
    .catch(err => console.log(err))