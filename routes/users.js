const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/user.js')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const auth = require('../middleware/authenticated')

router.get('/', async (req, res, next) => {
    const users = await User.find()
    res.send(users)
})

router.get('/me', [auth], async (req, res, next) => {
    let { token } = req
    if (!token) {
        const error = new Error('No authentication token provided.')
        error.statusCode = 401
        throw error
    }
    const user = await User.findById({ _id: token._id })
    if (!user) {
        const error = new Error('No user found with current jwt.')
        error.statusCode = 404
        throw error
    }
    token = user.generateAuthToken()
    const userData = _.pick(user, ['name', 'email', '_id', 'isAdmin', 'operators', 'lessonScores'])
    res.send({ user: userData, token })
})

router.post('/', async (req, res, next) => {
    // TODO: normalize email
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exists")

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
    const { record } = req.body
    // Look up user
    // If not existing, return 404 - Resource not found
    let user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).send("The user with the given ID was not found.")
    
    let lessonRecord = user.lessonScores.find(r => r.lessonSlug === record.lessonSlug)
    if (!lessonRecord) { 
        user.lessonScores.push(record)
        await user.save()
        return res.send(user)
    } else if (record.score > lessonRecord.score) {
        lessonRecord.score = record.score
        await user.save()
        return res.send(user)
    } else {
        // nothing to update
        return res.send(user)
    }

    // Validate
    // If invalid, return 400 - Bad request
})

module.exports = router