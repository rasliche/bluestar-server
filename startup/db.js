const mongoose = require('mongoose')
const logger = require('../utilities/logger')
const config = require('config')

// Database Connection
module.exports = function() {
    const db = config.get('db') || 'mongodb://localhost:27017/bluestar'
    
    // if (!config.get('dbUser')) {
    //     logger.info('Production DB')
    //     dbString = `mongodb://${dbUser}:${dbPass}@${db}`
    // } else {
    //     logger.info('Development DB')
    //     dbString = `mongodb://${db}`
    // }
    
    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}...`))
        .catch(error => logger.error(error, "Error connecting to bluestar database."))
}
