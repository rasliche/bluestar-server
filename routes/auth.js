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
    if (error) { return res.status(400).send('Invalid email or password') }

    const user = await User.findOne({ email: req.body.email })
    if (!user) { return res.status(400).send('Invalid email or password.') }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) { return res.status(400).send('Invalid email or password') }

    // Increase loginCount so we can keep track of active accounts
    user.loginCount++
    await user.save()
    
    const token = user.generateAuthToken()
    user = _.pick(user, ['name', 'email', '_id', 'isAdmin', 'operators', 'lessonScores'])
    
    res.send({ user, token })
})

module.exports.router = router
module.exports.validateLogin = validateLogin