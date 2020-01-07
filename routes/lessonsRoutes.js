const router = require('express').Router()
const lessonController = require('../controllers/lessonController')

router.get('/', lessonController.index)

router.post('/', lessonController.create)

router.get('/:id', lessonController.read)

router.put('/:id', lessonController.update)

router.delete('/:id', lessonController.destroy)

module.exports = router