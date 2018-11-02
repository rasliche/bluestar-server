const Joi = require('joi')
const mongoose = require('mongoose')

const Shop = mongoose.model('Shop', mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    website: String,
    location: String,
    vessels: Number,
    phone: String,
    owner: String,
    liaison: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}))

function validateShop(shop) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string(),
        website: Joi.string(),
        location: Joi.string(),
        vessels: Joi.number(),
        phone: Joi.string(),
        owner: Joi.string(),
        liaison: Joi.array(),
        staff: Joi.array()
    }
    return Joi.validate(shop, schema)
}

module.exports.Shop = Shop
module.exports.validate = validateShop
