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
    if (!operator) { return res.status(404).send('No operator found.')}
    res.send(operator)
})

router.post('/', auth, async (req, res, next) => {
    const { error } = validateOperator(req.body)
    if (error) return res.status(400).send("Valid operator data not present.")

    let operator = new Operator({
        name: req.body.name,
        password: req.body.password,
        programs: req.body.programs
    })
    await operator.save()
    res.status(201).send(operator)
})

router.delete('/:id', auth, async (req, res, next) => {
    const operator = await Operator.findByIdAndRemove(req.params.id)
    if (!operator) return res.status(404).send("Operator with given ID not found.")
    res.status(200).send(operator)
})

module.exports = router