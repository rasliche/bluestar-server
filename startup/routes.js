const express = require('express')
const usersRoutes = require('../routes/users')
const quizzesRoutes = require('../routes/quizzes')
const operatorsRoutes = require('../routes/operators')
const lessonsRoutes = require('../routes/lessons')
const postsRoutes = require('../routes/posts')
const programsRoutes = require('../routes/programs')
const { router: authRoutes } = require('../routes/auth')

module.exports = function(app) {
    app.use(express.json())
    app.use('/api/users/', usersRoutes)
    app.use('/api/quizzes/', quizzesRoutes)
    app.use('/api/operators/', operatorsRoutes)
    app.use('/api/lessons/', lessonsRoutes)
    app.use('/api/posts/', postsRoutes)
    app.use('/api/programs/', programsRoutes)
    app.use('/api/auth/', authRoutes)

    app.use((error, req, res, next) => {
        const status = error.statusCode || 500
        const message = error.message || "Server error."
        res.status(status).send(message)
    })
}