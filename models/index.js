const config = require('config');
const mongoose = require('mongoose');
const { Lesson, validateLesson } = require('./lesson');
const { Operator, validateOperator } = require('./operator');
const { Post, validatePost } = require('./post');
const { Program, validateProgram } = require('./program');
const Quiz = require('./quiz');
const { User, validateUser, validateRecord } = require('./user');

const env = config.util.getEnv();
const dbUri = config.get('db');

if (env === 'development') mongoose.set('debug', true);

mongoose.connect(dbUri, {
  user: '',
  pass: '',
  appname: 'FKNMS Blue Star Online Training Server',
  keepAlive: true,
  retryWrites: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  promiseLibrary: Promise,
});

mongoose.connection.on('connected', () => console.log(`Server connected to ${dbUri}.`));

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
