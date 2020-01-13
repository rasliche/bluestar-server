const router = require('express').Router()
const lessonContentController = require('../controllers/lessonContentController')

router.get('/', lessonContentController.index)

router.post('/', lessonContentController.create)

router.get('/:id', lessonContentController.read)

router.put('/:id', lessonContentController.update)

router.delete('/:id', lessonContentController.destroy)

module.exports = router