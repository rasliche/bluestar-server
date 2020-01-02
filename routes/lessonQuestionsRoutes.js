const router = require('express').Router()
const lessonQuestionsController = require('../controllers/lessonQuestionsController')

router.get('/:lessonId/questions/', lessonQuestionsController.index)

router.post('/:lessonId/questions/', lessonQuestionsController.create)

router.get('/:lessonId/questions/:questionId', lessonQuestionsController.read)

router.put('/:lessonId/questions/:questionId', lessonQuestionsController.update)

router.delete('/:lessonId/questions/:questionId', lessonQuestionsController.destroy)

module.exports = router