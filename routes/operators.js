const express = require('express')
const { Operator } = require('../models/operator.js')
const auth = require('../middleware/auth.js')

const router = express.Router()

router.get('/', [auth], async (req, res, next) => {
    const operators = await Operator.find()
    res.send(operators)
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