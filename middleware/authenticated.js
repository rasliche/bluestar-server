const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) { return res.status(401).send("No authorization header on request.") }

    const token = authHeader.split(' ')[1] // 'Bearer: jwtTokenString'
    if (!token) { return res.status(401).send('No authorization token present.')}
    jwt.verify(token, config.get('jwtPrivateKey'), (error, decodedToken) => {
        if (error) { return res.status(401).send('User authorization token is not able to be verified.')}
        if (config.util.getEnv('NODE_ENV') === 'development') { console.log(decodedToken) }
        req.token = decodedToken
    })
    next()
}