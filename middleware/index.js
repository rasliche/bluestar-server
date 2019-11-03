const isAuthenticated = require('./isAuthenticated');
const { logError, handleError } = require('./errorHandlers');

module.exports = {
  isAuthenticated,
  logError,
  handleError,
};
