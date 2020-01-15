const config = require('config')
const bcrypt = require('bcrypt')
const { User, validateUser } = require('../models/user')

exports.index = (req, res, next) => {
  
  res.send(['index', req.params])
}

exports.create = async (req, res, next) => {
    // TODO: normalize email
    const { error } = validateUser(req.body)
    if (error) { return res.status(400).send("Invalid user data received.") }

    let user = await User.findOne({ email: req.body.email })
    if (user) { return res.status(400).send("User already exists.") }

    // let validAdminPasswordProvided
    // if (req.body.adminPass && req.body.adminPass === config.get('admin_register_password')) {
    //     validAdminPasswordProvided = true;
    // }
    // if (!validPassword) { return res.status(400).send('Invalid email or password') }

    const validPassword = (req.body.adminPass === config.get('admin_register_password'))
    if (!validPassword) { return res.status(400).send('Invalid email or password') }
    
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: validPassword
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    
    const token = user.generateAuthToken()
    const { password, ...userWithoutPassword } = user.toObject()
    
    res.send({ ...userWithoutPassword, token })
}

exports.read = (req, res, next) => {
  
  res.send(['read', req.params])
}

exports.update = (req, res, next) => {
  
  res.send(['update', req.params])
}

exports.destroy = (req, res, next) => {
  
  res.send(['destroy', req.params])
}
