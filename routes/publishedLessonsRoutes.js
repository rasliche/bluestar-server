const router = require('express').Router()
const publishedLessonsController = require('../controllers/publishedLessonsController')
const auth = require('../middleware/authenticated')
const admin = require('../middleware/admin')


router.get('/', publishedLessonsController.index)

router.post('/', [auth, admin], publishedLessonsController.create)

// router.get('/:id', publishedLessonsController.read)

router.delete('/:lessonId', [auth, admin], publishedLessonsController.destroy)

module.exports = router