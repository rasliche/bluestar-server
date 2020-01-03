const router = require('express').Router({ mergeParams: true })
const userScoresController = require('../controllers/userScoresController')

// app.use('/api/user/:userId/scores/', router)
router.get('/', userScoresController.index)

router.post('/', userScoresController.create)

router.get('/:scoreId', userScoresController.read)

router.put('/:scoreId', userScoresController.update)

router.delete('/:scoreId', userScoresController.destroy)

module.exports = router