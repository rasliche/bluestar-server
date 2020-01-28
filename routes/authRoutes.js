const router = require('express').Router()
const { body } = require('express-validator')

const authController = require('../controllers/authController')

router.post('/login', 
    [
        body('email').isEmail().notEmpty(),
        body('password').isLength({ min: 6 }).notEmpty()
    ], 
    authController.create)

module.exports = router