const { User } = require('../models/user')
const { Operator } = require('../models/operator')

exports.index = async (req, res, next) => {
  const { operators } = await User.findById(req.params.userId)
    .select('operators')
    .populate({ path: 'operators.operator', select: 'name' })
  res.send(operators)
}

exports.create = async (req, res, next) => {
  const user = await User.findById(req.params.userId)
  if (!user) return res.status(404).send('User not found for the given ID.')
  const operator = await Operator.findById(req.body.shopId)
  if (!operator) return res.status(404).send('Operator not found for the given ID.')

  const alreadyAssociated = user.operators.find(r => r.operator.toString() === req.body.shopId)
  if (alreadyAssociated) {
    return res.status(400).send('User is already associated with the given operator.')
  }

  if (operator.password !== req.body.shopPassword) {
    return res.status(400).send('Provided password is invalid for the given operator.')
  }

  const newOperator = {
    operator: operator._id,
    canManage: user.isAdmin
  }
  user.operators.push(newOperator)
  await user.save()

  res.send({ operator, canManage: user.isAdmin })
}

exports.read = (req, res, next) => {
  
  res.send(['read', req.params])
}

exports.update = (req, res, next) => {
  
  res.send(['update', req.params])
}

exports.destroy = async (req, res, next) => {
  const user = await User.findById(req.params.userId)
  if (!user) return res.status(404).send('User not found for the given ID.')

  const operator = user.operators.find(o => o.operator === req.params.operatorId)
  if (!operator) return res.status(404).send('Operator not found for the given ID.')

  user.operators.id(operator._id).remove()
  await user.save()
  res.send(operator)
}
