const { Lesson, validateLesson } = require('./lesson');
const { Operator, validateOperator } = require('./operator');
const { Post, validatePost } = require('./post');
const { Program, validateProgram } = require('./program');
const Quiz = require('./quiz');
const { User, validateUser, validateRecord } = require('./user');

module.exports = {
  Lesson,
  validateLesson,
  Operator,
  validateOperator,
  Post,
  validatePost,
  Program,
  validateProgram,
  Quiz,
  User,
  validateUser,
  validateRecord,
};
