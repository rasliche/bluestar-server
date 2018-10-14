const routeDebugger = require('debug')('app:routes:quizzes')
const express = require('express')
const router = express.Router()

const { Quiz, validate } = require('../models/quiz')

// Quizzes API ENDPOINTS
// "/api/quizzes"
//     GET: finds all quizzes
//     POST: creates a new quiz

router.get('/', async (req, res) => {
    const quizzes = await Quiz.find().sort({ title: 1 })
    res.send(quizzes)
})

router.post('/', async (req, res) => {
    routeDebugger(req.body)
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    // Use let so quiz can be reassigned
    let quiz = new Quiz({ 
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    })
    quiz = await quiz.save()

    // send the quiz document back to the frontend
    res.send(quiz)
})

// "/api/quizzes/:id"
//     GET: find quiz by id
//     PUT: update quiz by id
//     DELETE: delete quiz by id

router.get("/:id", async (req, res) => {
    const quiz = await Quiz.find({ _id: req.params.id})
    if (!quiz) res.status(404).send("A quiz with the provided ID was not found.")

    res.send(quiz)
})

router.put("/:id", async (req, res) => {
    // validate the request that comes from the client
    // uses Joi validation
    const { error } = validate(req.body) // result.error
    // send 400 Bad Request
    if (error) res.status(400).send(error.details[0].message)

    const quiz = await Quiz.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    },
    {
        new: true
    })

    if (!quiz) res.status(404).send("A quiz with the provided ID was not found.")

    // Send quiz back to client
    res.send(quiz)
})

router.delete("/:id", async (req, res) => {
    const quiz = await Quiz.findByIdAndDelete(req.params.id)
    if (!quiz) res.status(404).send("A quiz with the provided ID was not found.")

    res.send(quiz)
})

module.exports = router
