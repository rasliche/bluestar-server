const { createFakeUser, createFakeOperator } = require('../data/seed')

exports.createUser = (req, res, next) => {
  
  res.send(['createUser', req.params])
}

exports.createOperator = (req, res, next) => {
  
  res.send(['createOperator', req.params])
}

exports.createQuestion = (req, res, next) => {
  
  res.send(['createQuestion', req.params])
}

exports.createLesson = (req, res, next) => {
  
  res.send(['createLesson', req.params])
}