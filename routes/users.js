const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/user.js')

router.get('/', async (req, res, next) => {
    const users = await User.find()
    res.send(users)
})

router.post('/', async (req, res, next) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exists")

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
    await user.save()
    res.send(user)
})

module.exports = router