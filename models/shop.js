const Joi = require('joi')
const mongoose = require('mongoose')

const Shop = mongoose.model('Shop', mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: String,
    vessels: Number,
    phone: String,
    owner: String,
    liaison: String
}))

function validateShop(shop) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required(),
        location: Joi.string(),
        vessels: Joi.number(),
        phone: Joi.string(),
        owner: Joi.string(),
        liaison: Joi.string()
    }
    return Joi.validate(shop, schema)
}

module.exports.Shop = Shop
module.exports.validate = validateShop
