const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/users')
const quizRoutes = require('./routes/quizzes')
const operatorRoutes = require('./routes/operators')
const newsRoutes = require('./routes/news')

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/api/users/', userRoutes)
app.use('/api/quizzes/', quizRoutes)
app.use('/api/operators/', operatorRoutes)
app.use('/api/news/', newsRoutes)

mongoose.connect('mongodb://localhost:27017/bluestar')
    .then(result => {
        app.listen(3000)
    })
    .catch(err => console.log(err))