const express = require('express')
const { Operator, validateOperator } = require('../models/operator')
const auth = require('../middleware/authenticated')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const operators = await Operator.find()
    res.send(operators)
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

router.get('/:operatorId', async (req, res, next) => {
    const operator = await Operator.findById(req.params.operatorId)
    if (!operator) { return res.status(404).send('No operator found.')}
    res.send(operator.toObject())
})

router.delete('/:operatorId', auth, async (req, res, next) => {
    const operator = await Operator.findByIdAndRemove(req.params.id)
    if (!operator) return res.status(404).send("Operator with given ID not found.")
    res.status(200).send(operator)
})

module.exports = router