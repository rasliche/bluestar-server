const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) return res.status(401).send('No authorization header on request.')

    const token = req.get('Authorization').split(' ')[1] // 'Bearer: jwtTokenString'
    jwt.verify(token, 'bluestarsecret', (error, decodedToken) => {
        if (error) return res.status(401).send('User authorization token is not able to be verified.')
        req.token = decodedToken
        console.log(decodedToken)
    })
    next()
}