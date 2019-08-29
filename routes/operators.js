const express = require('express')
const { Operator, validateOperator } = require('../models/operator')
const auth = require('../middleware/authenticated')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const operators = await Operator.find()
    res.send(operators)
})

router.get('/:slug', async (req, res, next) => {
    const operator = await Operator.findOne({ slug: req.params.slug })
    if (!operator) { return res.status(404).send({ message: 'No operator found.'})}
    res.send(operator)
})

router.post('/', auth, async (req, res, next) => {
    const { error } = validateOperator(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let operator = new Operator({
        name: req.body.name,
        password: req.body.password,
        programs: req.body.programs
    })
    await operator.save()
    res.status(201).send(operator)
})

module.exports = router