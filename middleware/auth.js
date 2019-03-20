const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]
    const decodedToken = jwt.verify(token, 'bluestarsecret')
    if (!decodedToken) return res.status(401).send("User is not authenticated.")
    next()
}