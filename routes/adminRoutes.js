const router = require('express').Router()
const adminController = require('../controllers/adminController')

router.get('/', adminController.index)

router.post('/', adminController.create)

router.get('/:id', adminController.read)

router.put('/:id', adminController.update)

router.delete('/:id', adminController.destroy)

module.exports = router