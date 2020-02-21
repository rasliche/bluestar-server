// checks that the user attached to the request object 
// is an admin

module.exports = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send("User is forbidden from accessing this resource.")
    console.log("Admin request.")
    next()
}