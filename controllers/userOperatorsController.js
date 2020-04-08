const { User } = require('../models/user')
const { Operator } = require('../models/operator')

exports.index = async (req, res, next) => {
  const userOperators = await User.findById(req.params.userId)
    .select('operators')
    .populate({ path: 'operators.operator', select: 'name' })
  res.send(userOperators)
}

exports.create = async (req, res, next) => {
  const user = await User.findById(req.params.userId)
  if (!user) return res.status(404).send('User not found for the given ID.')
  const operator = await Operator.findById(req.body.shopId)
  if (!operator) return res.status(404).send('Operator not found for the given ID.')

  const alreadyAssociated = user.operators.find(r => r.operator === req.body.shopId)
  console.log(`Already Assciated? ${alreadyAssociated}`)
  if (alreadyAssociated) {
    console.log(alreadyAssociated)
    return res.status(400).send('User is already associated with the give Operator.')
  }

  if (operator.password !== req.body.shopPassword) {
    return res.status(400).send('Provided password is invalid for the given shop.')
  }

  user.operators.push({
    operator: operator._id
  })
  await user.save()
  
  res.send(operator)
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
