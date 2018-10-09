const routeDebugger = require('debug')('app:routes:users')
const express = require('express')
const router = express.Router()

const { User, validate } = require('../models/user')

// USERS API ENDPOINTS
// "/api/users"
//     GET: finds all users
//     POST: creates a new user

router.get('/', async (req, res) => {
    const users = await User.find().sort({ name: 1 })
    res.send(users)
})

router.post('/', async (req, res) => {
    routeDebugger(req.body)
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Use let so customer can be reassigned
    let user = new User({ email: req.body.email })
    user = await user.save()

    // send the user document back to the frontend
    res.send(user)
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
