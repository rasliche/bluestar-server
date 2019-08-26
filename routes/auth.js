const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { User } = require('../models/user')
const bcrypt = require('bcrypt') // for comparing passwords
const _ = require('lodash')

function validateLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema)
}

router.post('/login', async (req, res, next) => {
    const { error } = validateLogin(req.body)
    if (error) {
        const error = new Error('Invalid email or password.')
        error.statusCode = 400
        throw error
    }

    const { email, password } = req.body
    let user = await User.findOne({ email: email })
    if (!user) {
        const error = new Error('Invalid email or password.')
        error.statusCode = 400
        throw error
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        const error = new Error('Invalid email or password.')
        error.statusCode = 400
        throw error
    }

    const token = user.generateAuthToken()
    user = _.pick(user, ['name', 'email', '_id', 'isAdmin', 'operators', 'lessonScores'])
    
    res.send({ user, token })
})

module.exports = router