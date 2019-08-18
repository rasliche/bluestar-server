const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        const error = new Error('No authorization header on request.')
        error.statusCode = 401
        throw error
    }

    const token = authHeader.split(' ')[1] // 'Bearer: jwtTokenString'
    jwt.verify(token, 'bluestarsecret', (error, decodedToken) => {
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