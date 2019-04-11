const express = require('express')
const mongoose = require('mongoose')

const usersRoutes = require('./routes/users')
const quizzesRoutes = require('./routes/quizzes')
const operatorsRoutes = require('./routes/operators')
const lessonsRoutes = require('./routes/lessons')
const postsRoutes = require('./routes/posts')
const programsRoutes = require('./routes/programs')
const authRoutes = require('./routes/auth')

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/api/users/', usersRoutes)
app.use('/api/quizzes/', quizzesRoutes)
app.use('/api/operators/', operatorsRoutes)
app.use('/api/lessons/', lessonsRoutes)
app.use('/api/posts/', postsRoutes)
app.use('/api/programs/', programsRoutes)
app.use('/api/auth/', authRoutes)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({ message: message })
})

mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://localhost:27017/bluestar')
    .then(result => {
        app.listen(process.env.PORT || 3000)
    })
    .catch(err => console.log(err))