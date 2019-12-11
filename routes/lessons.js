const express = require('express')
// const slug = require('slug')
const { Lesson, validateLesson } = require('../models/lesson')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const lessons = await Lesson.find()
    res.send(lessons)
})

router.get('/:id', async (req, res, next) => {
    const lesson = await Lesson.findById(req.params.id)
    res.send(lesson)
})

router.post('/', async (req, res, next) => {
    const { error } = validateLesson(req.body)
    if (error) return res.status(400).send(error)

    let lesson = new Lesson({
        title: req.body.title,
        description: req.body.description,
        programs: req.body.programs,
        published: req.body.published,
        content: req.body.content,
    })

    await lesson.save()
    res.status(201).send(lesson)
})

router.put('/:id', async (req, res, next) => {
    const { error } = validateLesson(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const lesson = await Lesson.findByIdAndUpdate(req.params.id,{
        // slug: slug(req.body.title),
        title: req.body.title,
        description: req.body.description,
        programs: req.body.programs,
        published: req.body.published,
        content: req.body.content,
    })
    if (!lesson) return res.status(404).send("Lesson with given ID not found.")

    res.send(lesson)
})

router.delete('/:id', async (req, res, next) => {
    const lesson = Lesson.findByIdAndDelete(req.params.id)
    if (!lesson) return res.status(404).send("Lesson with the given ID not found.")
    res.send(lesson)
})

module.exports = router