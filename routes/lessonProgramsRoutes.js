const router = require('express').Router({ mergeParams: true })
const lessonProgramsController = require('../controllers/lessonProgramsController')

// app.use('/api/lesson/:lessonId/programs/', router)
router.get('/', lessonProgramsController.index)

router.post('/', lessonProgramsController.create)

router.get('/:programId', lessonProgramsController.read)

router.put('/:programId', lessonProgramsController.update)

router.delete('/:programId', lessonProgramsController.destroy)

module.exports = router