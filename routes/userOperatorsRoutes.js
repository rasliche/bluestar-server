const router = require('express').Router()
const userOperatorsController = require('../controllers/userOperatorsController')

// /api/user/:userId/operators/
router.get('/', userOperatorsController.index)

router.post('/', userOperatorsController.create)

router.get('/:id', userOperatorsController.read)

router.put('/:id', userOperatorsController.update)

router.delete('/:id', userOperatorsController.destroy)

module.exports = router