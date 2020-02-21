const router = require('express').Router()
const authController = require('../controllers/authController')
const { body } = require('express-validator')

router.post('/login', 
    [
        body('email')
            .trim()
            .isEmail()
            .normalizeEmail()
            .isLength({ min: 5, max:255 }),
        body('password')
            .trim()
            .isLength({ min: 6 })
    ], 
    authController.create)

module.exports = router