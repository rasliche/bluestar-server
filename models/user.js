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
        minlength: 5,
        maxlength: 1024
    },
    operators: [
        {
            name: { type: String },
            _id: { type: mongoose.SchemaTypes.ObjectId },
            moderator: {
                type: Boolean,
                default: false
            }
        }
    ],
    quizScores: [
        {
            quizID: mongoose.SchemaTypes.ObjectId,
            quizName: String,
            score: {
                type: Number,
                default: 0
            }
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
        // name: this.name,
        // email: this.email,
        // operators: this.operators,
        // quizScores: this.quizScores,
        isAdmin: this.isAdmin
        }, 
        'bluestarsecret',
        { expiresIn: '2h' })
    return token
}

function validateUser(user) {
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        // password: Joi.string().min(5).max(255)
    }
    return Joi.validate(user, schema)
}

module.exports.User = mongoose.model('User', userSchema)
module.exports.validateUser = validateUser