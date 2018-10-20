const Joi = require('joi')
const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
// Joi password complexity npm password

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    isAdmin: Boolean,
    canModerate: {
        type: Array
    }
})

userSchema.methods.generateAuthToken = function() { // No arrow function
    const token = jwt.sign({ 
        _id: this._id, 
        isAdmin: this.isAdmin,
        canModerate: this.canModerate
    }, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        email: Joi.string().required()
    }
    return Joi.validate(user, schema)
}

module.exports.User = User
module.exports.validate = validateUser
