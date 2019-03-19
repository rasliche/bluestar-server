const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const bcrypt = require('bcrypt') // for comparing passwords

router.post('/login', (req, res, next) => {
    res.send('Logged in!')
})

module.exports = router