const mongoose = require('mongoose')
const Joi = require('joi')

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    answers: [
        { 
            text: {
                type: String,
                required: true,
            },
            isRight: {
                type: Boolean,
                required: true,
                default: false,
            }
        }
    ],
    theMoreYouKnow: {
        type: String,
    },
    // title: {
    //     type: String,
    //     required: true
    // },
    // description: {
    //     type: String,
    // },
    // passingScorePercent: {
    //     type: Number
    // },
    // questions: [ // make into separate resource?
    //     {
    //     }
    // ],
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
    },
})

function validateQuestion(question) {
    const schema = {
        text: Joi.string().required(),
        answers: Joi.array().items({
            text: Joi.string().required(),
            isRight: Joi.boolean().required(),
        }),
        theMoreYouKnow: Joi.string(),
        lesson: Joi.any(),
    }
    return Joi.validate(question, schema)
}

module.exports.questionSchema = questionSchema
module.exports.validateQuestion = validateQuestion
module.exports.Question = mongoose.model('Question', questionSchema)