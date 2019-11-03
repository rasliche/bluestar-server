const Joi = require('joi');
const bcrypt = require('bcrypt'); // for comparing passwords
const _ = require('lodash');
const { User } = require('../models');

function validateLogin(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required()
      .email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

const jwtLogin = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) { return res.status(400).send('Invalid email or password'); }

  const user = await User.findOne({ email: req.body.email });
  if (!user) { return res.status(400).send('Invalid email or password.'); }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) { return res.status(400).send('Invalid email or password'); }

  // Increase loginCount so we can keep track of active accounts
  // await User.findByIdAndUpdate(user._id, { $inc: user.loginCount, 'user.lastLogin': new Date().now })

  const token = user.generateAuthToken();
  const { password, ...userWithoutPassword } = user.toObject();

  res.send({ ...userWithoutPassword, token });
};

module.exports = {
  jwtLogin,
};
