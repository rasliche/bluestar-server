const Joi = require('joi')
const mongoose = require('mongoose')

const Quiz = mongoose.model('Quiz', mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    author: String
}))

function validateQuiz(quiz) {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string(),
        author: Joi.string()
    }
    return Joi.validate(quiz, schema)
}

module.exports.Quiz = Quiz
module.exports.validate = validateQuiz
