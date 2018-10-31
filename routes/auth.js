const Joi = require('joi')
// const _ = require('lodash')
const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')

// New user login
router.post('/', async (req, res) => {
    const { error } = validate(req.body) // result.error
    // 400 - Bad Request
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invalid email or password.")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Invalid email or password.")

    const token = user.generateAuthToken()
    res.send(token)
})

function validate(request) {
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(request, schema)
}

module.exports = router
