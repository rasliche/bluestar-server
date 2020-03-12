const router = require('express').Router()
const fakesController = require('../controllers/fakesController')

router.post('/user', fakesController.createUser)
router.post('/operator', fakesController.createOperator)
router.post('/question', fakesController.createQuestion)
router.post('/lesson', fakesController.createLesson)

module.exports = router