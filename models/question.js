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
    // lessonId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: null,
    // },
})

function validateQuestion(question) {
    const schema = {
        text: Joi.string().required(),
        answers: Joi.array().items({
            text: Joi.string().required(),
            isRight: Joi.boolean().required(),
        }),
        theMoreYouKnow: Joi.string(),
    }
    return Joi.validate(lesson, schema)
}

module.exports.questionSchema = questionSchema
module.exports.Question = mongoose.model('Quiz', questionSchema)