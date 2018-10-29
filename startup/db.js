const mongoose = require('mongoose')

// Database Connection
module.exports = function() {
    const db = 'mongodb://localhost:27017/bluestar'
    //config.get('db')
    
    mongoose.connect(db)
        .then(() => console.log(`Connected to ${db}...`))
}
