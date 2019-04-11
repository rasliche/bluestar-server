module.exports = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send("User is forbidden from accessing this resource.")
    next()
}