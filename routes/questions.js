const express = require('express')
const { Question, validateQuestion } = require('../models/question.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const questions = await Question.find()
    res.send(questions)
})

router.get('/:id', async (req, res, next) => {
    const question = await Question.findById(req.params.id)
    res.send(question)
})

// router.get('/getByLesson/:lessonId', async (req, res, next) => {
//     const question = await Question.findOne({ lessonId: req.params.lessonId })
//     res.send(question)
// })

router.post('/', async (req, res, next) => {
    const { error } = validateQuestion(req.body)
    if (error) return res.status(400).send('Invalid question.')

    const question = new Question({
        text: req.body.text,
        answers: req.body.answers,
        theMoreYouKnow: req.body.theMoreYouKnow,
    })
    
    await question.save()
    res.status(201).send(question)
})

router.delete('/:id', async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id)
    if (!question) return res.status(404).send("Question with the given ID not found.")
    res.send(question)
})

module.exports = router