const router = require('express').Router()
const operatorManagersController = require('../controllers/operatorManagersController')

router.get('/', operatorManagersController.index)

router.post('/', operatorManagersController.create)

router.get('/:id', operatorManagersController.read)

router.put('/:id', operatorManagersController.update)

router.delete('/:id', operatorManagersController.destroy)

module.exports = router