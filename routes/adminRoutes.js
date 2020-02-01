const router = require('express').Router()
const adminController = require('../controllers/adminController')
const { body } = require('express-validator')

router.get('/', adminController.index)

router.post('/', 
    [
        body('name')
            .trim()
            .isLength({ min: 1, max: 255 }),
        body('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .isLength({ min: 5, max:255 }),
        body('password')
            .trim()
            .isLength({ min: 6 }),
        body('adminPass')
            .exists()
    ], 
    adminController.create)

router.get('/:id', adminController.read)

router.put('/:id', adminController.update)

router.delete('/:id', adminController.destroy)

module.exports = router