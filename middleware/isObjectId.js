const { param, validationResult } = require('express-validator')

module.exports = (req, res, next) => {
    console.log(req.params)
    param().isMongoId()
    validationResult(req).throw()
    // const result = validationResult(req)
    if (!result.isEmpty()) {
        const error = new Error("Invalid MongoID received in URL.")
        error.statusCode = 422
        next(error)
    }
    next()
}