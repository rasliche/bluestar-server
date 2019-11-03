const { Operator, validateOperator } = require('../models');

const readOperators = async (req, res) => {
  const operators = await Operator.find();
  res.send(operators);
};

const readOperator = async (req, res) => {
  const operator = await Operator.findOne({ slug: req.params.slug });
  if (!operator) { return res.status(404).send('No operator found.'); }
  return res.send(operator);
};

const createOperator = async (req, res) => {
  const { error } = validateOperator(req.body);
  if (error) return res.status(400).send('Valid operator data not present.');

  const operator = new Operator({
    name: req.body.name,
    password: req.body.password,
    programs: req.body.programs,
  });
  await operator.save();
  return res.status(201).send(operator);
};

const deleteOperator = async (req, res) => {
  const operator = await Operator.findByIdAndRemove(req.params.id);
  if (!operator) return res.status(404).send('Operator with given ID not found.');
  return res.status(200).send(operator);
};

module.exports = {
  readOperators,
  readOperator,
  createOperator,
  deleteOperator,
};
