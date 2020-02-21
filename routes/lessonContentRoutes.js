const router = require('express').Router({ mergeParams: true })
const lessonContentController = require('../controllers/lessonContentController')
const auth = require('../middleware/authenticated')
const admin = require('../middleware/admin')

// /api/lesson/:lessonId/content/
router.get('/', lessonContentController.index)

// router.post('/', lessonContentController.create)

// router.get('/:contentId', lessonContentController.read)

router.put('/', [auth, admin], lessonContentController.update)

// router.delete('/:contentId', lessonContentController.destroy)

module.exports = router