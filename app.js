require('express-async-errors');
const config = require('config');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { logError, handleError } = require('./middleware');

const port = config.get('port');

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use('/', routes);
app.use(logError);
app.use(handleError);

app.listen(port, () => {
  console.log(`Application Name: ${config.get('name')}`);
  console.log(`Server listening on port ${port}.`);
});
