const mongoose = require('mongoose')
// const Joi = require('joi')

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    passingScorePercent: {
        type: Number
    },
    questions: [ // make into separate resource?
        {
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
                        default: false,}
                    }
            ],
            theMoreYouKnow: {
                type: String,
            }
        }
    ],
    lessonSlug: {
        type: String
    },
})

module.exports.Quiz = mongoose.model('Quiz', quizSchema)