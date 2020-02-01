const router = require('express').Router()
const { body, sanitizeBody } = require('express-validator')

const authController = require('../controllers/authController')

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