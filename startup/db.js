const config = require('config')
const mongoose = require('mongoose')

module.exports = async function () {
    const db = config.get('db')
    await mongoose.connect(db, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,

    })
    if (config.util.getEnv('NODE_ENV') === 'development') {
        console.log(`Connected to ${db}`)
    }
}