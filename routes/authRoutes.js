const router = require('express').Router()
const { body } = require('express-validator')

const authController = require('../controllers/authController')

router.post('/login', 
    [
        body('email').not().isEmpty().isEmail(),
        body('password').notEmpty()
    ], 
    authController.create)

module.exports = router