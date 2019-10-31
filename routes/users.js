const express = require('express')
const router = express.Router()
const { User, validateUser, validateRecord } = require('../models/user.js')
const bcrypt = require('bcrypt')
const config = require('config')
const auth = require('../middleware/authenticated')

router.get('/', async (req, res, next) => {
    const users = await User.find()
    res.send(users)
})

router.get('/me', [auth], async (req, res, next) => {
    const { token } = req
    // if (!token) {
    //     const error = new Error('No authentication token provided.')
    //     error.statusCode = 401
    //     throw error
    // }
    const user = await User.findById(token._id)
    if (!user) { res.status(404).send('No user found with current jwt.') }
    //     const error = new Error('No user found with current jwt.')
    //     error.statusCode = 404
    //     throw error
    // }
    // token = user.generateAuthToken()
    const { password, ...userWithoutPassword } = user.toObject()
    res.send(userWithoutPassword)
})

router.get('/:id', async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (!user) return res.status(404).send("No user found with given ID.")
    const { password, ...userWithoutPassword } = user.toObject()
    res.send(userWithoutPassword)
})

router.post('/', async (req, res, next) => {
    // TODO: normalize email
    const { error } = validateUser(req.body)
    if (error) { return res.status(400).send("Invalid user data received.") }

    let user = await User.findOne({ email: req.body.email })
    if (user) { return res.status(400).send("User already exists.") }

    console.log(req.body)
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    
    const token = user.generateAuthToken()
    const { password, ...userWithoutPassword } = user.toObject()
    
    res.send({ ...userWithoutPassword, token })
})

router.post('/register-as-admin', async (req, res, next) => {
    // TODO: normalize email
    const { error } = validateUser(req.body)
    if (error) { return res.status(400).send("Invalid user data received.") }

    let user = await User.findOne({ email: req.body.email })
    if (user) { return res.status(400).send("User already exists.") }

    const validPassword = (req.body.adminPass === config.get('admin_register_password'))
    if (!validPassword) { return res.status(400).send('Invalid email or password') }
    
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    
    const token = user.generateAuthToken()
    const { password, ...userWithoutPassword } = user.toObject()
    
    res.send({ ...userWithoutPassword, token })
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