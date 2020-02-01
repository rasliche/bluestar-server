const config = require('config')
const mongoose = require('mongoose')
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
    operators: [{
        operator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Operator'
        },
        canManage: {
            type: Boolean,
            default: false,
        }
    }],
    lessonScores: [
        {
            lesson: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson',
                // required: true,
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
// Token contains User._id and is no longer valid after 2 hours.

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { 
            _id: this._id,
        }, 
        config.get('jwtPrivateKey'), // secret
        { expiresIn: '2h' }) // claims
    return token
}

module.exports.User = mongoose.model('User', userSchema)