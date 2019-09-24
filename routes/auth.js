const router = require('express').Router();
const controllers = require('../controllers');

/**
 * JWT Auth API
 */
router.post('/login', controllers.auth.jwtLogin);

/**
  * OAuth Auth API
  */

module.exports = router;
