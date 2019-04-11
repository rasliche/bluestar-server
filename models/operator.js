const mongoose = require('mongoose')
const slug = require('slugs')
const Joi = require('joi')

const operatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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

function validateOperator(operator) {
    const schema = {
        name: Joi.string().required(),
        password: Joi.string(),
        programs: Joi.array(),
        managers: Joi.array(),
    }
    return Joi.validate(operator, schema)
}

module.exports.Operator = mongoose.model('Operator', operatorSchema)
module.exports.validateOperator = validateOperator