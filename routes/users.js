const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/user')

// USERS API ENDPOINTS
// "/api/users"
//     GET: finds all users
//     POST: creates a new user

router.get('/', async (req, res) => {
    const users = await User.find().sort({ lastName: 1 })
    res.send(users)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')

    // Use let so user can be reassigned
    user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    user = await user.save()

    // send the user document back to the frontend
    res.send(_.pick(user, ['firstName', 'lastName', '_id', 'email']))
})

// "/api/users/:id"
//     GET: find user by id
//     PUT: update user by id
//     DELETE: delete user by id

router.get("/:id", async (req, res) => {
    const user = await User.find({ _id: req.params.id})
    if (!user) return res.status(404).send("A user with the provided ID was not found.")

    res.send(user)
})

router.put("/:id", async (req, res) => {
    // validate the request that comes from the client
    // uses Joi validation
    const { error } = validate(req.body) // result.error
    // send 400 Bad Request
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.params.id, {
        email: req.body.email
    },
    {
        new: true
    })

    if (!user) return res.status(404).send("A user with the provided ID was not found.")

    // Send user back to client
    res.send(user)
})

router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).send("A user with the provided ID was not found.")

    res.send(user)
})

module.exports = router
