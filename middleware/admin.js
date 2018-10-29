module.exports = function (req, res, next) {
    // execute after auth middleware (sets req.user)
    // 401 Unauthorized - Incorrect auth token
    // 403 Forbidden - Correct token, but not allowed
    if(!req.user.isAdmin) return res.status(403).send("User is not authorized to access this resource.")
    next()
}