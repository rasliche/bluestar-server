const express = require('express')
const { Question, validateQuestion } = require('../models/question.js')
const { Lesson } = require('../models/lesson.js')

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
    const { lesson, text, answers, theMoreYouKnow } = req.body
    const { error } = validateQuestion({
        lesson,
        text,
        answers,
        theMoreYouKnow
    })
    if (error) return res.status(400).send('Invalid question.')

    try {
        const question = new Question({
            lesson: req.body.lesson,
            text: req.body.text,
            answers: req.body.answers,
            theMoreYouKnow: req.body.theMoreYouKnow,
        })
        await question.save()
        console.log(question)
        const lesson = await Lesson.findById(req.body.lesson)
        lesson.questions.push(question)
        console.log(lesson)
        await lesson.save()
    
        res.status(201).send(question)
    } catch (error) {
        console.log(error.stack)
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id)
    if (!question) return res.status(404).send("Question with the given ID not found.")
    res.send(question)
})

module.exports = router