const Joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model('User', mongoose.Schema({
    // firstName: String,
    // lastName: String,
    email: {
        type: String,
        required: true
    }//,
    // shops: Array,
    // role: String
}))

function validateUser(user) {
    const schema = {
        email: Joi.string().required()
    }
    return Joi.validate(user, schema)

}

module.exports.User = User
module.exports.validate = validateUser
