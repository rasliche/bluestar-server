const express = require('express')
const users = require('../routes/users')
const shops = require('../routes/shops')
const quizzes = require('../routes/quizzes')

module.exports = function (app) {
    app.use(express.json())
    // Routes
    app.use('/api/users', users)
    app.use('/api/shops', shops)
    app.use('/api/quizzes', quizzes)
}