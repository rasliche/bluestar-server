const router = require('express').Router({ mergeParams: true })
const userScoresController = require('../controllers/userScoresController')

// app.use('/api/user/:userId/scores/', router)
router.get('/', userScoresController.index)

router.post('/', userScoresController.create)

router.get('/:lessonId', userScoresController.read)

router.put('/:lessonId', userScoresController.update)

router.delete('/:lessonId', userScoresController.destroy)

module.exports = router