const mongoose = require('mongoose')
const logger = require('../utilities/logger')
const config = require('config')

// Database Connection
module.exports = function() {
    const db = config.get('db')
    const dbUser = config.get('dbUser')
    const dbPass = config.get('dbPass')
    
    mongoose.connect(`mongodb://${dbUser}:${dbPass}@${db}`)
        .then(() => logger.info(`Connected to ${db}...`))
        .catch(error => logger.error("Error connecting to bluestar database.", error))
}
