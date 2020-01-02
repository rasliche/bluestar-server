exports.index = (req, res, next) => {
  console.log(req.params)
  res.send(req.params)
}

exports.create = (req, res, next) => {
  
  res.send('create')
}

exports.read = (req, res, next) => {
  
  res.send('read')
}

exports.update = (req, res, next) => {
  
  res.send('update')
}

exports.destroy = (req, res, next) => {
  
  res.send('destroy')
}
