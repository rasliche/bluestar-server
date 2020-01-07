const Joi = require('joi')
const { User } = require('../models/user')
const bcrypt = require('bcrypt') // for comparing passwords

function validateLogin(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  }

  return Joi.validate(user, schema)
}

exports.create = async (req, res, next) => {
  const { error } = validateLogin(req.body)
  if (error) { return res.status(400).send('Invalid email or password') }

  const user = await User.findOne({ email: req.body.email })
  if (!user) { return res.status(400).send('Invalid email or password.') }

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) { return res.status(400).send('Invalid email or password') }

  const token = user.generateAuthToken()
  const { password, ...userWithoutPassword } = user.toObject()

  // TODO: Refactor to send a single user object
  res.send({ ...userWithoutPassword, token })
}