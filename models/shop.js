var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ShopSchema = new Schema({
    name: String,
    location: String,
    vessels: Number,
    phone: Number,
    owner: String,
    bsLiason: String
})

var Shop = mongoose.model("Shop", ShopSchema)
module.exports = Shop
