require('express-async-errors');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const { logError, handleError } = require('./middleware');

const port = config.get('port');
const app = express();

app.set('port', port);

// Log requests
app.use(morgan('combined'));

// Parse body parameters and attach them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// Set HTTP headers for server security
app.use(helmet());

// Enable all Cross-Origin Resource Sharing
app.use(cors());

// API routes
app.use('/', routes);
app.use(logError);
app.use(handleError);

const server = app.listen(port, () => {
  console.log(`Application Name: ${config.get('name')}`);
  console.log(`Server listening on port ${port}.`);
});

module.exports = server;
