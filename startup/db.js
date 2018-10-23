const mongoose = require('mongoose')
const logger = require('../utilities/logger')
const config = require('config')

// Database Connection
module.exports = function() {
    const db = config.get('db')
    const dbUser = config.get('dbUser')
    const dbPass = config.get('dbPass')
    
    let dbString
    if (config.get('dbUser')) {
        logger.info('Production DB')
        dbString = `mongodb://${dbUser}:${dbPass}@${db}`
    } else {
        logger.info('Development DB')
        dbString = `mongodb://${db}`
    }
    
    mongoose.connect(dbString)
        .then(() => logger.info(`Connected to ${dbString}...`))
        .catch(error => logger.error("Error connecting to bluestar database.", error))
}
