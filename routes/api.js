const router = require('express').Router();
const controllers = require('../controllers');

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
