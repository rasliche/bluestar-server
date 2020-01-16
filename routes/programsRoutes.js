const router = require('express').Router({ mergeParams: true })
const { Program, validateProgram } = require('../models/program')

router.get('/', async (req, res, next) => {
    const programs = await Program.find()
    res.send(programs)
})

router.get('/:id', async (req, res, next) => {
    const program = await Program.findById(req.params.id)
    res.send(program)
})

router.post('/', async (req, res, next) => {
    const { error } = validateProgram(req.body)
    if (error) return res.status(400).send(error)

    let program = new Program({
        name: req.body.name,
    })

    await program.save()
    res.status(201).send(program)
})

router.put('/:id', async (req, res, next) => {
    const { error } = validateProgram(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const program = await Program.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    })
    if (!program) return res.status(404).send("Program with given ID not found.")
    res.send(program)
})

router.delete('/:id', async (req, res, next) => {
    const program = await Program.findByIdAndRemove(req.params.id)
    if (!program) return res.status(404).send("Program with given ID not found.")
    res.send(program)
})

module.exports = router