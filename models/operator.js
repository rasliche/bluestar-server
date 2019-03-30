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
        default: "scuba"
    },
    programs: [ String ],
    managers: [ mongoose.SchemaTypes.ObjectId ]
})

// TODO: pre('save') hook to create slug field
operatorSchema.pre('save', function(next) {
    this.slug = slug(this.name)
    next()
})

module.exports.Operator = mongoose.model('Operator', operatorSchema)