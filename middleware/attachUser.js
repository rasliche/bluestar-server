const { User } = require('../models/user');

// This middleware should extract the token
module.exports = async (req, res, next) => {
  const user = await User.findById(req.token._id);
  if (!user) { return res.status(404).send('No user found for given ID'); }

  req.user = user;
  next();
};
