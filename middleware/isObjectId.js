const { param, validationResult } = require('express-validator')

module.exports = async (req, res, next) => {
    console.log(req.params)
    param().isMongoId()
    // console.log(validationResult(req))
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error("Invalid MongoID received in URL.")
        error.statusCode = 422
        next(error)
    }
    next()
}