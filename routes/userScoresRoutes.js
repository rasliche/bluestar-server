const router = require('express').Router()
const userScoresController = require('../controllers/userScoresController')

router.get('/:userId/scores/', userScoresController.index)

router.get('/:userId/scores/:scoreId', userScoresController.read)

router.post('/:userId/scores/', userScoresController.create)

router.put('/:userId/scores/:scoreId', userScoresController.update)

router.delete('/:userId/scores/:scoreId', userScoresController.destroy)

module.exports = router