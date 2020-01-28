const router = require('express').Router()
const userController = require('../controllers/userController')

const auth = require('../middleware/authenticated')

router.get('/', userController.index)

router.post('/', userController.create)

router.get('/:id', userController.read)

router.get('/me', [auth], async (req, res, next) => {
    const { token } = req
    // if (!token) {
    //     const error = new Error('No authentication token provided.')
    //     error.statusCode = 401
    //     throw error
    // }
    const user = await User.findById(token._id)
    if (!user) { res.status(404).send('No user found with current jwt.') }
    //     const error = new Error('No user found with current jwt.')
    //     error.statusCode = 404
    //     throw error
    // }
    // token = user.generateAuthToken()
    const { password, ...userWithoutPassword } = user.toObject()
    res.send(userWithoutPassword)
})

module.exports = router