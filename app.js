const express = require('express')
const userRoutes = require('./routes/users')
const shopsRoutes = require('./routes/shops')
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
app.use('/api/shops/', shopsRoutes)
app.use('/api/news/', newsRoutes)

app.listen(3000)