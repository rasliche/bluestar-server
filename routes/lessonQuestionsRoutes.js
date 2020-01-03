const router = require('express').Router({ mergeParams: true })
const lessonQuestionsController = require('../controllers/lessonQuestionsController')

// app.use('/api/lesson/:lessonId/questions/', router)
router.get('/', lessonQuestionsController.index)

router.post('/', lessonQuestionsController.create)

router.get('/:questionId', lessonQuestionsController.read)

router.put('/:questionId', lessonQuestionsController.update)

router.delete('/:questionId', lessonQuestionsController.destroy)

module.exports = router