const router = require('express').Router({ mergeParams: true })
const lessonController = require('../controllers/lessonController')
const auth = require('../middleware/authenticated')
const admin = require('../middleware/admin')

router.get('/', lessonController.index)

router.post('/', [auth, admin], lessonController.create)

router.get('/:id', lessonController.read)

router.put('/:id', [auth, admin], lessonController.update)

router.delete('/:id', [auth, admin], lessonController.destroy)

module.exports = router