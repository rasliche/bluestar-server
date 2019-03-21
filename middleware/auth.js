const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]
    const decodedToken = jwt.verify(token, 'bluestarsecret')
    // TODO: check issued at time to see if token is valid
    // expiry time?
    // send logout signal?
    if (!decodedToken) return res.status(401).send("User is not authenticated.")
    next()
}