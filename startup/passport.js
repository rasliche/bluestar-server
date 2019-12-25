const passport = require('passport')
const { User } = require('../models/user')


module.exports = function () {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}
