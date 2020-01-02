const { User, validateUser, validateRecord } = require('../models/user.js')
const bcrypt = require('bcrypt')

exports.index = async (req, res, next) => {
    const users = await User.find()
    res.send(users)
}

exports.create = async (req, res, next) => {
    // TODO: normalize email
    const { error } = validateUser(req.body)
    if (error) { return res.status(400).send("Invalid user data received.") }

    let user = await User.findOne({ email: req.body.email })
    if (user) { return res.status(400).send("User already exists.") }

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
}

exports.read = async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (!user) return res.status(404).send("No user found with given ID.")
    const { password, ...userWithoutPassword } = user.toObject()
    res.send(userWithoutPassword)
}

exports.update = (req, res, next) => {
  
  res.send()
}

exports.destroy = (req, res, next) => {
  
  res.send()
}
