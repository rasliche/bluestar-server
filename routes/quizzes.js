const express = require('express')
const { Quiz } = require('../models/quiz.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const quizzes = await Quiz.find()
    res.send(quizzes)
})

router.post('/', async (req, res, next) => {
    let { title } = req.body
    let quiz = new Quiz({
        title
    })
    await quiz.save()
    res.status(201).send(quiz)
})

module.exports = router