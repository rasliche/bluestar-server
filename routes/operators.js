const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send("Charter Operators Here")
})

module.exports = router