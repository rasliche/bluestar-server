require('express-async-errors');
const config = require('config');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const { logError, handleError } = require('./middleware');

const port = config.get('port');

const app = express();

// Log requests
app.use(morgan('combined'));

// Parse body parameters and attach them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());


app.use('/', routes);
app.use(logError);
app.use(handleError);

app.listen(port, () => {
  console.log(`Application Name: ${config.get('name')}`);
  console.log(`Server listening on port ${port}.`);
});
