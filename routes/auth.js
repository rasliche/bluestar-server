const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { User } = require('../models/user')
const bcrypt = require('bcrypt') // for comparing passwords
const _ = require('lodash')

function validateLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        // password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema)
}


router.post('/login', async (req, res, next) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) {
            const error = new Error("Invalid login data.")
            error.statusCode = 400
            throw error
        }
    
        const { email } = req.body // { password }
        let user = await User.findOne({ email: email })
        if (!user) return res.status(400).send('Invalid email or password.')
    
        // const validPassword = await bcrypt.compare(password, user.password)
        // if (!validPassword) return res.status(400).send('Invalid email or password.')
    
        const token = user.generateAuthToken()
        user = _.pick(user, ['name', 'email', '_id', 'isAdmin', 'operators', 'quizScores'])
        
        res.send({ user, token })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router