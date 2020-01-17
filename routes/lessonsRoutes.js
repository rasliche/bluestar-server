const router = require('express').Router()
const lessonController = require('../controllers/lessonController')
const admin = require('../middleware/admin')

router.get('/', lessonController.index)

router.post('/', admin, lessonController.create)

router.get('/:id', lessonController.read)

router.put('/:id', admin, lessonController.update)

router.delete('/:id', admin, lessonController.destroy)

module.exports = router