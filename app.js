require('express-async-errors');
const config = require('config');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const quizzesRoutes = require('./routes/quizzes');
const operatorsRoutes = require('./routes/operators');
const lessonsRoutes = require('./routes/lessons');
const postsRoutes = require('./routes/posts');
const programsRoutes = require('./routes/programs');
const authRoutes = require('./routes/auth');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

app.use('/api/users/', usersRoutes);
app.use('/api/quizzes/', quizzesRoutes);
app.use('/api/operators/', operatorsRoutes);
app.use('/api/lessons/', lessonsRoutes);
app.use('/api/posts/', postsRoutes);
app.use('/api/programs/', programsRoutes);
app.use('/api/auth/', authRoutes);
app.use((error, req, res) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Server error.';
  res.status(status).send(message);
});

const db = config.get('db');
mongoose.connect(db);
if (config.util.getEnv() === 'development') {
  console.log(`Connected to ${db}`);
}

const port = config.get('port');

app.listen(port, () => {
  console.log(`Application Name: ${config.get('name')}`);
  console.log(`Now listening on port ${port}.`);
});
