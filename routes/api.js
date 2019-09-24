const router = require('express').Router();
const controllers = require('../controllers');
const { isAuthenticated } = require('../middleware');

/**
 * Lesson API
 */
router.get('/lesson', controllers.lesson.readLessons);
router.get('/lesson/:slug', controllers.lesson.readLesson);
router.post('/lesson', controllers.lesson.createLesson);
router.put('/lesson/:id', controllers.lesson.updateLesson);
router.delete('/lesson/:id', controllers.lesson.deleteLesson);

/**
 * Operator API
 */
router.get('/operator', controllers.operator.readOperators);
router.get('/operator/:slug', controllers.operator.readOperator);
router.post('/operator', isAuthenticated, controllers.operator.createOperator);
router.delete('/operator/:id', isAuthenticated, controllers.operator.deleteOperator);

/**
 * Post API
 */


/**
 * Program API
 */


/**
 * Quiz API
 */


/**
 * User API
 */

module.exports = router;
