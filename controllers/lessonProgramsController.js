const { Program } = require('../models/program')

exports.index = (req, res, next) => {
  
  res.send(['index', req.params])
}

exports.create = (req, res, next) => {
  
  res.send(['create', req.params])
}

exports.read = (req, res, next) => {
  
  res.send(['read', req.params])
}

exports.update = (req, res, next) => {
  
  res.send(['update', req.params])
}

exports.destroy = (req, res, next) => {
  
  res.send(['destroy', req.params])
}
