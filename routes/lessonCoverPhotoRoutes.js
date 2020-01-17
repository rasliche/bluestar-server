const router = require('express').Router({ mergeParams: true })
const lessonCoverPhotoController = require('../controllers/lessonCoverPhotoController')
const isObjectId = require('../middleware/isObjectId')

// Read just the cover photo
router.get('/', lessonCoverPhotoController.index)

// Update the cover photo
router.put('/:id', lessonCoverPhotoController.update)

module.exports = router