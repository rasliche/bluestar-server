const config = require('config')
const mongoose = require('mongoose')

module.exports = async function () {
    const db = config.get('db')
    await mongoose.connect(db, { useNewUrlParser: true, })
    if (config.util.getEnv() === 'development') {
        console.log(`Connected to ${db}`)
    }
}