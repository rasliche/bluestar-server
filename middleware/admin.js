const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]
    const { isAdmin } = jwt.verify(token, 'bluestarsecret')
    if (!isAdmin) return res.status(403).send("User is not authorized.")
    next()
}