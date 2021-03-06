const config = require('config')
const mongoose = require('mongoose')

module.exports = async function () {
    const db = {}
    db.mongo_username = config.get('db.mongo_username')
    db.mongo_password = config.get('db.mongo_password')
    db.mongo_hostname = config.get('db.mongo_hostname')
    db.mongo_port = config.get('db.mongo_port')
    db.mongo_db = config.get('db.mongo_db')
    
    let mongoURI

    if (config.util.getEnv('NODE_ENV') === 'development') {
        mongoURI = `mongodb://${db.mongo_hostname}:${db.mongo_port}/${db.mongo_db}`
    } else if (config.util.getEnv('NODE_ENV') === 'production') {
        mongoURI = `mongodb+srv://${db.mongo_username}:${db.mongo_password}@${db.mongo_hostname}/${db.mongo_db}?retryWrites=true&w=majority`
    }
    
    await mongoose.connect(
        mongoURI, {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        connectTimeoutMS: 10000,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,

    })
    
    if (config.util.getEnv('NODE_ENV') === 'development') {
        console.log(`Connected to the ${db.mongo_db} database on ${db.mongo_hostname}:${db.mongo_port}`)
    }
}