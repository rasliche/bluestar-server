const express = require('express')

const router = express.Router()

router.post('/login', (req, res, next) => {
    res.send('Logged in!')
})

module.exports = router