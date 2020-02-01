const { Program } = require('../models/program')

exports.index = async (req, res, next) => {
  const programs = await Program.find()
  res.status(200).send(programs)
}

exports.create = async (req, res, next) => {
  const program = new Program({
    name: req.body.name,
  })
  
  await program.save()
  res.status(201).send(program)
}

exports.read = async (req, res, next) => {
    const program = await Program.findById(req.params.programId)
    res.status(200).send(program)
}

exports.update = async (req, res, next) => {
    const program = await Program.findByIdAndUpdate(req.params.programId, {
        name: req.body.name,
    })
    if (!program) return res.status(404).send("Program with given ID not found.")
    res.send(program)
}

exports.destroy = async (req, res, next) => {
    const program = await Program.findByIdAndRemove(req.params.programId)
    if (!program) return res.status(404).send("Program with given ID not found.")
    res.send(program)
}
