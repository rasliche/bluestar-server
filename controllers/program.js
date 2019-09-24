const { Program, validateProgram } = require('../models');

const readPrograms = async (req, res) => {
  const programs = await Program.find();
  res.send(programs);
};

const readProgram = async (req, res) => {
  const program = await Program.findOne({ _id: req.params.id });
  res.send(program);
};

const createProgram = async (req, res) => {
  const { error } = validateProgram(req.body);
  if (error) return res.status(400).send(error);

  const program = new Program({
    name: req.body.name,
  });

  await program.save();
  return res.status(201).send(program);
};

const updateProgram = async (req, res) => {
  const { error } = validateProgram(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const program = await Program.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });
  if (!program) return res.status(404).send('Program with given ID not found.');
  return res.send(program);
};

const deleteProgram = async (req, res) => {
  const program = await Program.findByIdAndRemove(req.params.id);
  if (!program) return res.status(404).send('Program with given ID not found.');
  return res.send(program);
};

module.exports = {
  readPrograms,
  readProgram,
  createProgram,
  updateProgram,
  deleteProgram,
};
