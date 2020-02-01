const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/authenticated')

router.get('/', userController.index)

router.post('/', userController.create)

router.get('/:id', userController.read)

router.get('/me', [auth], async (req, res, next) => {
    const { password, ...userWithoutPassword } = req.user.toObject()
    res.send(userWithoutPassword)
})

module.exports = router