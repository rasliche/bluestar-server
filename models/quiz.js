const mongoose = require('mongoose')
const Joi = require('joi')

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
    questions: [
        {
            text: String,
            answers: [
                { text: String, isRight: Boolean }
            ],
            theMoreYouKnow: String,
        }
    ],
    lessonId: {
        type: mongoose.SchemaTypes.ObjectId
    }
})

module.exports.Quiz = mongoose.model('Quiz', quizSchema)