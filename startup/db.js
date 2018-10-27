const mongoose = require('mongoose')
const logger = require('../utilities/logger')
const config = require('config')

// Database Connection
module.exports = function() {
    const db = config.get('db')
    
    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}...`))
}
