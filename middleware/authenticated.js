const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
        const error = new Error('No authorization header on request.')
        error.statusCode = 401
        throw error
    }

    const token = authHeader.split(' ')[1] // 'Bearer: jwtTokenString'
    if (!token) { return res.status(401).send({ message: 'No authorization token present.' })}
    jwt.verify(token, config.get('jwtPrivateKey'), (error, decodedToken) => {
        if (error) {
            const error = new Error('User authorization token is not able to be verified.')
            error.statusCode = 401
            throw error
        }
        req.token = decodedToken
        console.log(decodedToken)
    })
    next()
}