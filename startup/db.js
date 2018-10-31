const config = require('config')
const mongoose = require('mongoose')

// Database Connection
module.exports = function() {
    const db = config.get('db')
    //config.get('db')
    
    mongoose.connect(db)
        .then(() => console.log(`Connected to ${db}...`))
}
