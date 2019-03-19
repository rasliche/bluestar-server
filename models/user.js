const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // password: {
    //     type: String,
    //     default: "pw"
    // },
})

module.exports.User = mongoose.model('User', userSchema)