const config = require('config')
const mongoose = require('mongoose')

module.exports = async function () {
    const db = {}
    db.mongo_hostname = config.get('db.mongo_hostname')
    db.mongo_port = config.get('db.mongo_port')
    db.mongo_db = config.get('db.mongo_db')
    
    await mongoose.connect(`${db.mongo_hostname}:${db.mongo_port}/${db.mongo_db}`, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,

    })
    if (config.util.getEnv('NODE_ENV') === 'development') {
        console.log(`Connected to the ${db.mongo_db} database on ${db.mongo_hostname}:${db.mongo_port}`)
    }
}