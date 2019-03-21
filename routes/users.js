const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/user.js')
const bcrypt = require('bcrypt')
const _ = require('lodash')

router.get('/', async (req, res, next) => {
    const users = await User.find()
    res.send(users)
})

router.post('/', async (req, res, next) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exists")

    user = new User(_.pick(req.body, ['name', 'email', 'password']))

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()
    user = _.pick(user, ['name', 'email', '_id', 'isAdmin'])

    res.send({ user, token })
})

module.exports = router