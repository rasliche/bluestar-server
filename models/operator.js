const mongoose = require('mongoose')
const slug = require('slugs')

const operatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    password: {
        type: String,
        default: "pw"
    },
    programs: [ String ],
    moderators: [ mongoose.SchemaTypes.ObjectId ]
})

// TODO: pre('save') hook to create slug field

module.exports.Operator = mongoose.model('Operator', operatorSchema)