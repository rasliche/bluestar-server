const router = require('express').Router()
const userScoresController = require('../controllers/userScoresController')

router.get('/', userScoresController.index)

router.get('/:id', userScoresController.read)

router.post('/', userScoresController.create)

router.put('/:id', userScoresController.update)

router.delete('/:id', userScoresController.destroy)

module.exports = router