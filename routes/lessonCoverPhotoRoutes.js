const router = require('express').Router({ mergeParams: true })
const lessonCoverPhotoController = require('../controllers/lessonCoverPhotoController')

// Read just the cover photo
router.get('/', lessonCoverPhotoController.index)

// Update the cover photo
router.put('/', lessonCoverPhotoController.update)

module.exports = router