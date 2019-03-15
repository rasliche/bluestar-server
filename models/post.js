const mongoose = require('mongoose')
const slug = require('slugs')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)