const config = require('config')
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

router.post('/register-as-admin', async (req, res, next) => {
    // TODO: normalize email
    const { error } = validateUser(req.body)
    if (error) { return res.status(400).send("Invalid user data received.") }

    let user = await User.findOne({ email: req.body.email })
    if (user) { return res.status(400).send("User already exists.") }

    // let validAdminPasswordProvided
    // if (req.body.adminPass && req.body.adminPass === config.get('admin_register_password')) {
    //     validAdminPasswordProvided = true;
    // }
    // if (!validPassword) { return res.status(400).send('Invalid email or password') }

    const validPassword = (req.body.adminPass === config.get('admin_register_password'))
    if (!validPassword) { return res.status(400).send('Invalid email or password') }
    
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: validPassword
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    
    const token = user.generateAuthToken()
    const { password, ...userWithoutPassword } = user.toObject()
    
    res.send({ ...userWithoutPassword, token })
})

router.put('/:id/records', [auth,], userController.update)

module.exports = router