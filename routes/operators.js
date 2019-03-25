const express = require('express')
const { Operator } = require('../models/operator')
const auth = require('../middleware/authenticated')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const operators = await Operator.find().select('-password')
    res.send(operators)
})

router.get('/:slug', async (req, res, next) => {
    const operator = await Operator.findOne({ slug: req.params.slug }).select('-password')
    res.send(operator)
})

router.post('/', async (req, res, next) => {
    let { name } = req.body
    let operator = new Operator({
        name
    })
    await operator.save()
    res.status(201).send(operator)
})

module.exports = router