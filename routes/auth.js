const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { User } = require('../models/user')
const bcrypt = require('bcrypt') // for comparing passwords
function validateLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema)
}


    const { error } = validateLogin(req.body)
    if (error) return res.status(400).send(error.details[0].message)

})

module.exports = router