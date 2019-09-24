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
router.get('/post', controllers.post.readPosts);
router.get('/post/:slug', controllers.post.readPost);
router.post('/post', controllers.post.createPost);
router.put('/post/:id', controllers.post.updatePost);
router.delete('/post/:id', controllers.post.deletePost);

/**
 * Program API
 */
router.get('/program', controllers.program.readPrograms);
router.get('/program/:id', controllers.program.readProgram);
router.post('/program', controllers.program.createProgram);
router.put('/program/:id', controllers.program.updateProgram);
router.delete('/program/:id', controllers.program.deleteProgram);

/**
 * Quiz API
 */
router.get('/quiz', controllers.quiz.readQuizzes);
router.post('/quiz', controllers.quiz.createQuiz);

/**
 * User API
 */
router.get('/user', controllers.user.readUsers);
router.get('/user/me', isAuthenticated, controllers.user.me);
router.get('/user/:id', controllers.user.readUser);
router.post('/user', controllers.user.createUser);
router.put('/user/:id/records', isAuthenticated, controllers.user.updateUser);

module.exports = router;
