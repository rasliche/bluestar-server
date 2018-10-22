const express = require('express')
const router = express.Router()

const { Topic, validate } = require('../models/topic')

// Topics API ENDPOINTS
// "/api/topics"
//     GET: finds all topics
//     POST: creates a new topic

router.get('/', async (req, res) => {
    const topics = await Topic.find()
    res.send(topics)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    // Use let so topic can be reassigned
    let topic = new Topic({ 
        title: req.body.title,
        content: req.body.content,
        relevantPrograms: req.body.relevantPrograms
    })
    topic = await topic.save()

    // send the topic document back to the frontend
    res.send(topic)
})

// "/api/topics/:id"
//     GET: find topic by id
//     PUT: update topic by id
//     DELETE: delete topic by id

router.get("/:id", async (req, res) => {
    const topic = await Topic.find({ _id: req.params.id})
    if (!topic) res.status(404).send("A topic with the provided ID was not found.")

    res.send(topic)
})

router.put("/:id", async (req, res) => {
    // validate the request that comes from the client
    // uses Joi validation
    const { error } = validate(req.body) // result.error
    // send 400 Bad Request
    if (error) res.status(400).send(error.details[0].message)

    const topic = await Topic.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        relevantPrograms: req.body.relevantPrograms,
        content: req.body.content
        },
        {
            new: true
        })

    if (!topic) res.status(404).send("A topic with the provided ID was not found.")

    // Send topic back to client
    res.send(topic)
})

router.delete("/:id", async (req, res) => {
    const topic = await Topic.findByIdAndDelete(req.params.id)
    if (!topic) res.status(404).send("A topic with the provided ID was not found.")

    res.send(topic)
})

module.exports = router
