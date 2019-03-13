const mongoose = require('mongoose')

const operatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String
    },
})

module.exports.Operator = mongoose.model('Operator', operatorSchema)