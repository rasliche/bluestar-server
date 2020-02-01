const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../models/user')

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) { return res.status(401).send("No authorization header on request.") }

    const token = authHeader.split(' ')[1] // 'Bearer: jwtTokenString'
    if (!token) { return res.status(401).send('No authorization token present.')}
    
    jwt.verify(token, config.get('jwtPrivateKey'), async (error, decodedToken) => {
        if (error) { return res.status(401).send('User authorization token is not able to be verified.')}
        if (config.util.getEnv('NODE_ENV') === 'development') { console.log(decodedToken) }
        
        const user = await User.findById(decodedToken)
        if (!user) { return res.status(401).send('User not found for provided token ID.') }
        req.user = user
    })
    next()
}