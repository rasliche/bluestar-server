const router = require('express').Router()
const publishedLessonsController = require('../controllers/publishedLessonsController')

const auth = require('../middleware/authenticated')

// router.get('/', publishedLessonsController.index)

router.post('/', [auth], publishedLessonsController.create)

// router.get('/:id', publishedLessonsController.read)

router.delete('/:lessonId', [auth], publishedLessonsController.destroy)

module.exports = router