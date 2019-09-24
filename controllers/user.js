const express = require('express')
const router = express.Router()
const { User, validateUser, validateRecord } = require('../models/user.js')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const auth = require('../middleware/authenticated')

router.get('/', async (req, res, next) => {
    const users = await User.find()
    res.send(users)
})

router.get('/me', [auth], async (req, res, next) => {
    let { token } = req
    // if (!token) {
    //     const error = new Error('No authentication token provided.')
    //     error.statusCode = 401
    //     throw error
    // }
    const user = await User.findById({ _id: token._id })
    if (!user) { res.status(404).send('No user found with current jwt.') }
    //     const error = new Error('No user found with current jwt.')
    //     error.statusCode = 404
    //     throw error
    // }
    token = user.generateAuthToken()
    const userData = _.pick(user, ['name', 'email', '_id', 'isAdmin', 'operators', 'lessonScores'])
    res.send({ user: userData, token })
})

router.get('/:id', async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (!user) return res.status(404).send("No user found with given ID.")
    user = _.pick(user, ['name', 'email', '_id', 'isAdmin', 'operators', 'lessonScores'])
    res.send(user)
})

router.post('/', async (req, res, next) => {
    // TODO: normalize email
    const { error } = validateUser(req.body)
    if (error) { return res.status(400).send("Invalid user data received.") }

    let user = await User.findOne({ email: req.body.email })
    if (user) { return res.status(400).send("User already exists.") }

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    
    const token = user.generateAuthToken()
    user = _.pick(user, ['name', 'email', '_id', 'isAdmin', 'operators', 'lessonScores'])

    res.send({ user, token })
})

router.put('/:id/records', [auth], async (req, res, next) => {
    const { error } = validateRecord(req.body) // validation found in User.js Model
    if (error) { return res.status(400).send("Invalid record received.")}
    // Will we need to modify this to allow admin access?
    if (req.token._id !== req.params.id) { return res.status(401).send("User does not match authorization token.")}
    // Look up user
    // If not existing, return 404 - Resource not found
    let user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).send("The user with the given ID was not found.")
    
    let lessonRecord = user.lessonScores.find(r => r.lessonSlug === req.body.lessonSlug)
    if (!lessonRecord) { 
        user.lessonScores.push(req.body)
        await user.save()
        return res.status(201).send(user)
    } else if (req.body.score > lessonRecord.score) {
        lessonRecord.score = req.body.score
        await user.save()
        return res.status(200).send(user)
    } else {
        // nothing to update
        return res.status(200).send(user)
    }
})

module.exports = router