const config = require('config')
const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024
    },
    operators: [
        {
            name: { type: String },
            _id: { type: mongoose.SchemaTypes.ObjectId },
            manager: {
                type: Boolean,
                default: false
            }
        }
    ],
    lessonScores: [
        {
            lessonId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            lessonName: {
                type: String,
                required: true,
            },
            score: {
                type: Number,
                default: 0
            },
            date: {
                type: Date,
                default: () => Date.now()
            }
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
    loginCount: {
        type: Number,
    }
})

// Method on User object that signs and returns a JSON Web Token
// Token contains User._id, whether the user is a full Admin
// and is no longer valid after 2 hours.

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { 
            _id: this._id,
            isAdmin: this.isAdmin, // Can you just destructure { _id, isAdmin }
        }, 
        config.get('jwtPrivateKey'), // secret
        { expiresIn: '2h' }) // claims
    return token
}

// Validate that User has the required shape.
// Used in creating new users and logging in.
// validateUser checks the plain text password for length,
// but the hashed password is stored in the User record.

function validateUser(user) {
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255),
        adminPass: Joi.string(),
    }
    return Joi.validate(user, schema)
}

function validateRecord(record) {
    const schema = {
        lessonName: Joi.string().required(),
        lessonId: Joi.string().required(),
        score: Joi.number().required(),
        date: Joi.date(),
    }
    return Joi.validate(record, schema)
}

module.exports.User = mongoose.model('User', userSchema)
module.exports.validateUser = validateUser
module.exports.validateRecord = validateRecord