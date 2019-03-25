const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    questions: [
        {
            text: String,
            answers: [
                { text: String, isRight: Boolean }
            ]
        }
    ],
    lessonSlug: String
})

module.exports.Quiz = mongoose.model('Quiz', quizSchema)