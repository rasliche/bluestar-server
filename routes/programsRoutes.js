const router = require('express').Router({ mergeParams: true })
const programsController = require('../controllers/programsController')
const auth = require('../middleware/authenticated')
const admin = require('../middleware/admin')

router.get('/', programsController.index)

router.post('/', [auth, admin], programsController.create)

router.get('/:programId', programsController.read)

router.put('/:programId', [auth, admin], programsController.update)

router.delete('/:programId', [auth, admin], programsController.destroy)

module.exports = router