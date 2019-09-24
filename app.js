require('express-async-errors');
const config = require('config');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const { logError, handleError } = require('./middleware');

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use('/', routes);
app.use(logError);
app.use(handleError);

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
