const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
})

module.exports.Quiz = mongoose.model('Quiz', quizSchema)